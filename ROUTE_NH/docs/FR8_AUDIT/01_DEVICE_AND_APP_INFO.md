# 01 — Device and Application Information

## 1. Physical Android Device Details

| Property | Value | Source |
|---|---|---|
| Manufacturer | `motorola` | `getprop ro.product.manufacturer` |
| Model | `motorola edge 70 fusion` | `getprop ro.product.model` |
| Codename / Device | `marvel` (`product:marvel_gh`) | `getprop ro.product.device` / `adb devices -l` |
| Android Version | `17` (API Level `37`) | `getprop ro.build.version.release` / `ro.build.version.sdk` |
| CPU ABI | `arm64-v8a` | `getprop ro.product.cpu.abi` |
| Physical Screen Size | `1272 x 2772` px | `wm size` |
| Physical Screen Density | `450` dpi (`density = 2.8125`) | `wm density` / `dumpsys display` |
| Logical dp Dimensions | `452.3 x 985.6` dp (`~452 x 986 dp`) | Calculated (`px / 2.8125`) |
| Orientation | Portrait (`rotation 0`, `mCurrentOrientation=0`) | `dumpsys display` |
| Display Capabilities | `60 / 90 / 120 / 144 Hz`, HDR (`[2, 3, 4]`) | `dumpsys display` |
| Connection Method | Wireless ADB over TLS (`192.168.1.33:41405`, mDNS `_adb-tls-connect._tcp`) | `adb mdns services` / `adb devices -l` |

---

## 2. Installed FR8 Application Details

| Property | Value | Source |
|---|---|---|
| Package Name | `in.fr8.book` | `pm list packages -3 -f` |
| APK Path | `/data/app/~~GEzO946LjNj9FwAPVC-bxw==/in.fr8.book-34mI009fZz5be7TB8DuybQ==/base.apk` | `pm list packages -3 -f` |
| Version Name | `2.0.122` | `dumpsys package in.fr8.book` |
| Version Code | `122` | `dumpsys package in.fr8.book` |
| Min SDK / Target SDK | `minSdk=24` / `targetSdk=36` | `dumpsys package in.fr8.book` |
| Architecture Splits | `base`, `config.arm64_v8a`, `config.xxhdpi`, language splits (`bn`, `en`, `gu`, `hi`, `kn`, `mr`, `ta`, `te`) | `dumpsys package in.fr8.book` |
| First Install / Last Update | `2026-11-24 17:54:00` | `dumpsys package in.fr8.book` |
| App Runtime Architecture | Capacitor hybrid Android shell (`MainActivity` hosting full-screen `android.webkit.WebView` + Radix UI dialogs + Novu Inbox + Firebase Cloud Messaging) | `dumpsys package` & `android layout` |
| Launcher Activity | `in.fr8.book/.MainActivity` | `Activity Resolver Table` |
| Verified App Link Domains | `book.fr8.in`, `dev.book.fr8.in`, `qa.book.fr8.in` (`AutoVerify=true`) | `Domain verification status` |
| Registered Services | `com.capacitorjs.plugins.pushnotifications.MessagingService`, `com.google.firebase.messaging.FirebaseMessagingService` | `Service Resolver Table` |
| Content Providers | `FileOpenerProvider` (`in.fr8.book.file.opener.provider`), `FileProvider` (`in.fr8.book.fileprovider`), `InitializationProvider`, `FirebaseInitProvider` | `ContentProvider Authorities` |

### Declared & Granted Permissions (`dumpsys package in.fr8.book`)

| Permission | Status at Audit Time | Notes |
|---|---|---|
| `android.permission.INTERNET` | Granted | Required for WebView, API calls, tracking |
| `android.permission.ACCESS_NETWORK_STATE` | Granted | Network connectivity checks |
| `android.permission.ACCESS_LOCAL_NETWORK` | Granted (`REVOKE_WHEN_REQUESTED`) | Local network access |
| `android.permission.WAKE_LOCK` | Granted | Background/FCM wake lock |
| `android.permission.ACCESS_ADSERVICES_AD_ID` | Granted | Ad services ID |
| `android.permission.ACCESS_ADSERVICES_ATTRIBUTION` | Granted | Ad attribution |
| `android.permission.POST_NOTIFICATIONS` | **Denied** (`granted=false`) | Push notification permission (user-sensitive) |
| `android.permission.CAMERA` | **Denied** (`granted=false`) | Camera permission (user-sensitive) |

---

## 3. Inspection Environment & Available Capabilities

| Tool / Capability | Status | Version / Path / Notes |
|---|---|---|
| Android Studio | **Active (Running)** | `Android Studio Rabbit 1 | 2026.2.1` (PID `25704`, project `Route NH` ready) |
| Android CLI (`android.exe`) | **Verified & Used** | `v1.1.16919734` (`C:\Program Files\Android\Android Studio\plugins\android\resources\android-cli\bin\android.exe`) |
| ADB (`adb.exe`) | **Verified & Used** | `C:\Users\tecdo\AppData\Local\Android\Sdk\platform-tools\adb.exe` |
| Android UI Hierarchy / Accessibility Tree | **Available & Used** | `android layout --full --pretty` (exposed full WebView DOM nodes, bounds, states, interactions, and off-screen items; required `--no-idle` fallback due to a live SystemUI notification chronometer) |
| UIAutomator | **Available via Android CLI** | Layout instrumentation server installed and executed on device |
| ADB / Android CLI Screenshots | **Available & Used** | `android screen capture` — 50 PNG screenshots captured directly from device |
| Touch Interaction (`tap`) | **Available & Used** | `adb shell input tap <x> <y>` |
| Scrolling (`swipe`) | **Available & Used** | `adb shell input swipe x1 y1 x2 y2 <duration>` |
| Text Input | **Available & Used** | `adb shell input text <text>` |
| Back Navigation | **Available & Used** | `adb shell input keyevent KEYCODE_BACK` |
| Account State During Audit | **Already Authenticated** | Authenticated multi-user corporate shipper account (Admin role). Pre-auth screens (Splash, Login, OTP, Registration, Onboarding) were not re-triggered to avoid terminating the active user session. |
