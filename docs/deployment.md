# Route NH - Production Deployment & Android Setup Guide

## 1. Web Application Deployment (Ubuntu / Cloud VPS)

```bash
# 1. Clone repository
git clone https://github.com/routenh/platform.git /var/www/route-nh
cd /var/www/route-nh

# 2. Install dependencies
npm ci

# 3. Configure production environment
cp .env.example .env
# Edit .env with your MySQL production credentials and JWT secret:
# DATABASE_URL="mysql://routenh_user:StrongPassword@localhost:3306/routenh_prod"

# 4. Run database migrations & seeders
npx prisma db push --schema=prisma/schema.mysql.prisma
node prisma/seed.js

# 5. Build optimized Next.js production bundle
npm run build

# 6. Run process with PM2
pm2 start npm --name "route-nh" -- start
pm2 save
```

## 2. Android Phone Connection (Motorola Edge 70 Fusion)

The physical device is connected to the computer via wireless ADB.

### Step 1: Forward local server port to device
Run the following command in PowerShell so that the phone can access `http://localhost:3000`:
```powershell
& "C:\Users\ceofi\AppData\Local\Android\Sdk\platform-tools\adb.exe" reverse tcp:3000 tcp:3000
```

### Step 2: Install debug build onto the phone
```powershell
Set-Location "C:\Users\ceofi\AndroidStudioProjects\RouteNH"
.\gradlew.bat installDebug
```

### Step 3: Launch app on phone
The Route NH Mobile app will launch, connecting to the Route NH platform on port 3000. Real-time GPS location updates from the phone's hardware GPS sensor will stream directly into the Route NH database!
