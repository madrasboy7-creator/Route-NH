import { execFile } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

const REPO_ROOT = path.resolve(import.meta.dirname, "..");
const LOG_FILE = path.join(REPO_ROOT, "auto-sync.log");
const LOCK_FILE = path.join(REPO_ROOT, ".auto-sync.lock");
const DEBOUNCE_MS = 4000;
const FALLBACK_POLL_MS = 30000;
const MAX_LOG_BYTES = 1024 * 1024;

const IGNORED_SEGMENTS = new Set([
  ".git",
  "node_modules",
  ".next",
  "out",
  "build",
  ".vercel",
  "coverage",
]);

const IGNORED_FILES = new Set(["auto-sync.log", ".auto-sync.lock"]);

let debounceTimer = null;
let syncing = false;
let pendingResync = false;

function log(message) {
  const line = `[${new Date().toISOString()}] ${message}\n`;
  process.stdout.write(line);
  try {
    if (fs.existsSync(LOG_FILE) && fs.statSync(LOG_FILE).size > MAX_LOG_BYTES) {
      const tail = fs.readFileSync(LOG_FILE, "utf8").slice(-256 * 1024);
      fs.writeFileSync(LOG_FILE, tail, "utf8");
    }
    fs.appendFileSync(LOG_FILE, line, "utf8");
  } catch {
    // Ignore log write errors so watcher keeps running
  }
}

function isProcessAlive(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

function acquireLock() {
  if (fs.existsSync(LOCK_FILE)) {
    const existingPid = Number(fs.readFileSync(LOCK_FILE, "utf8").trim());
    if (Number.isInteger(existingPid) && existingPid !== process.pid && isProcessAlive(existingPid)) {
      log(`Auto-sync is already running (PID ${existingPid}). Exiting.`);
      process.exit(0);
    }
  }
  fs.writeFileSync(LOCK_FILE, String(process.pid), "utf8");
}

function releaseLock() {
  try {
    if (fs.existsSync(LOCK_FILE) && fs.readFileSync(LOCK_FILE, "utf8").trim() === String(process.pid)) {
      fs.unlinkSync(LOCK_FILE);
    }
  } catch {
    // Ignore cleanup errors
  }
}

function shouldIgnorePath(relativePath) {
  if (!relativePath) return false;
  const normalized = relativePath.replace(/\\/g, "/");
  const parts = normalized.split("/");
  if (IGNORED_FILES.has(parts[parts.length - 1])) return true;
  return parts.some((part) => IGNORED_SEGMENTS.has(part));
}

async function runGit(args) {
  const { stdout, stderr } = await execFileAsync("git", args, {
    cwd: REPO_ROOT,
    windowsHide: true,
    maxBuffer: 10 * 1024 * 1024,
  });
  return { stdout: stdout.trim(), stderr: stderr.trim() };
}

function buildCommitMessage(files) {
  if (files.length === 1) {
    return `auto-sync: update ${files[0]}`;
  }
  const preview = files.slice(0, 3).map((f) => path.basename(f)).join(", ");
  const extra = files.length > 3 ? ` (+${files.length - 3} more)` : "";
  return `auto-sync: update ${preview}${extra}`;
}

async function syncChanges(reason) {
  if (syncing) {
    pendingResync = true;
    return;
  }

  if (fs.existsSync(path.join(REPO_ROOT, ".git", "index.lock"))) {
    log("Git index.lock detected; retrying shortly.");
    scheduleSync("index-lock-retry", 2000);
    return;
  }

  syncing = true;
  try {
    const { stdout: statusOut } = await runGit(["status", "--porcelain"]);

    if (statusOut) {
      await runGit(["add", "-A"]);
      const { stdout: stagedOut } = await runGit(["diff", "--cached", "--name-only"]);
      const stagedFiles = stagedOut ? stagedOut.split(/\r?\n/).filter(Boolean) : [];

      if (stagedFiles.length > 0) {
        const msg = buildCommitMessage(stagedFiles);
        await runGit(["commit", "-m", msg]);
        log(`Committed (${reason}): ${msg}`);
      }
    }

    // Push if there are any unpushed commits on the current branch
    let unpushedCount = 0;
    try {
      const { stdout: aheadOut } = await runGit(["rev-list", "--count", "@{u}..HEAD"]);
      unpushedCount = Number(aheadOut) || 0;
    } catch {
      unpushedCount = 1;
    }

    if (unpushedCount > 0) {
      const { stdout: branch } = await runGit(["rev-parse", "--abbrev-ref", "HEAD"]);
      await runGit(["push", "origin", branch]);
      log(`Pushed ${unpushedCount} commit(s) to origin/${branch}.`);
    }
  } catch (err) {
    const detail = err?.stderr?.trim() || err?.message || String(err);
    log(`Sync error: ${detail}`);
  } finally {
    syncing = false;
    if (pendingResync) {
      pendingResync = false;
      scheduleSync("queued-change", DEBOUNCE_MS);
    }
  }
}

function scheduleSync(reason, delayMs = DEBOUNCE_MS) {
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    debounceTimer = null;
    void syncChanges(reason);
  }, delayMs);
}

acquireLock();
log(`Watching ${REPO_ROOT} for changes (debounce ${DEBOUNCE_MS}ms)...`);

const watcher = fs.watch(REPO_ROOT, { recursive: true }, (_eventType, filename) => {
  if (filename && shouldIgnorePath(filename)) return;
  scheduleSync(`fs:${filename || "change"}`);
});

watcher.on("error", (err) => {
  log(`Watcher error: ${err.message}`);
});

const pollInterval = setInterval(() => {
  void syncChanges("periodic-check");
}, FALLBACK_POLL_MS);

// Run an initial check on startup in case uncommitted/unpushed changes already exist
void syncChanges("startup");

function shutdown() {
  log("Stopping auto-sync watcher.");
  clearInterval(pollInterval);
  if (debounceTimer) clearTimeout(debounceTimer);
  watcher.close();
  releaseLock();
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
process.on("exit", releaseLock);
