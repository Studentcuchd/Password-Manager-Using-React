# 🚀 Installation Guide - All Platforms

## 📋 Table of Contents
1. [Windows Installation](#windows)
2. [Linux Installation](#linux)
3. [macOS Installation](#macos)
4. [Prerequisites](#prerequisites)
5. [Troubleshooting](#troubleshooting)

---

## 🪟 Windows Installation

### Prerequisites
- **For C++:**
  - MinGW-w64 or Visual Studio
  - Command Prompt or PowerShell
  
- **For React:**
  - Node.js v16+ (Download from nodejs.org)
  - npm (comes with Node.js)

### C++ Version Setup

#### Option 1: Using MinGW (Recommended)

**Step 1: Install MinGW**
```powershell
# Download from: https://sourceforge.net/projects/mingw-w64/
# Or use chocolatey:
choco install mingw
```

**Step 2: Add to PATH**
```powershell
# Add C:\MinGW\bin to system PATH
# Verify installation:
g++ --version
```

**Step 3: Compile and Run**
```powershell
# Navigate to project folder
cd f:\Agiann

# Use the batch file (easiest)
run-cpp.bat

# Or compile manually
g++ password.cpp -o password.exe
password.exe
```

#### Option 2: Using Visual Studio

**Step 1: Install Visual Studio**
- Download Visual Studio Community (free)
- Install "Desktop development with C++" workload

**Step 2: Open Project**
- Open Visual Studio
- File → Open → File
- Select password.cpp
- Press F5 to compile and run

### React Version Setup

**Step 1: Install Node.js**
```powershell
# Download from: https://nodejs.org/
# Choose LTS version
# Verify installation:
node --version
npm --version
```

**Step 2: Install Dependencies**
```powershell
# Navigate to React project
cd f:\Agiann\password-manager-react

# Use batch file (easiest)
..\setup-react.bat

# Or install manually
npm install
```

**Step 3: Run Development Server**
```powershell
npm run dev
```

**Step 4: Open in Browser**
```
http://localhost:3000
```

---

## 🐧 Linux Installation

### Prerequisites
- g++ compiler
- Node.js v16+
- npm

### C++ Version Setup

**Step 1: Install g++**
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install build-essential

# Fedora
sudo dnf install gcc-c++

# Arch Linux
sudo pacman -S gcc

# Verify installation
g++ --version
```

**Step 2: Compile and Run**
```bash
# Navigate to project
cd ~/Agiann

# Compile
g++ password.cpp -o password

# Run
./password
```

**Note:** `conio.h` is Windows-specific. For Linux, you need to modify the code:

**Create password_linux.cpp:**
```cpp
// Replace conio.h functions with termios
#include <termios.h>
#include <unistd.h>

string get_masked_input() {
    string input = "";
    char ch;
    termios oldt, newt;
    
    tcgetattr(STDIN_FILENO, &oldt);
    newt = oldt;
    newt.c_lflag &= ~(ECHO);
    tcsetattr(STDIN_FILENO, TCSANOW, &newt);
    
    getline(cin, input);
    
    tcsetattr(STDIN_FILENO, TCSANOW, &oldt);
    cout << endl;
    return input;
}
```

### React Version Setup

**Step 1: Install Node.js**
```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# Fedora
sudo dnf install nodejs

# Arch Linux
sudo pacman -S nodejs npm

# Verify
node --version
npm --version
```

**Step 2: Install Dependencies**
```bash
cd ~/Agiann/password-manager-react
npm install
```

**Step 3: Run Development Server**
```bash
npm run dev
```

**Step 4: Open in Browser**
```
http://localhost:3000
```

---

## 🍎 macOS Installation

### Prerequisites
- Xcode Command Line Tools
- Homebrew (optional but recommended)
- Node.js v16+

### C++ Version Setup

**Step 1: Install Xcode Command Line Tools**
```bash
xcode-select --install
```

**Step 2: Verify g++**
```bash
g++ --version
# or
clang++ --version
```

**Step 3: Compile and Run**
```bash
# Navigate to project
cd ~/Agiann

# Compile
g++ password.cpp -o password

# Run
./password
```

**Note:** Like Linux, `conio.h` is not available. Use the Linux alternative above.

### React Version Setup

**Step 1: Install Node.js**

**Option A: Using Homebrew (Recommended)**
```bash
# Install Homebrew if not installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js
brew install node

# Verify
node --version
npm --version
```

**Option B: Download Installer**
- Visit https://nodejs.org/
- Download macOS installer
- Run the installer

**Step 2: Install Dependencies**
```bash
cd ~/Agiann/password-manager-react
npm install
```

**Step 3: Run Development Server**
```bash
npm run dev
```

**Step 4: Open in Browser**
```
http://localhost:3000
```

---

## 📦 Prerequisites Details

### Node.js Versions
```
Minimum: v16.0.0
Recommended: v18.x LTS or v20.x LTS
Check version: node --version
```

### npm Versions
```
Minimum: v8.0.0
Recommended: Latest
Check version: npm --version
Update: npm install -g npm@latest
```

### Disk Space Requirements
```
C++ Version: <1 MB
React Project: ~300 MB (with node_modules)
```

### Browser Requirements (React)
```
Chrome: v90+
Firefox: v88+
Safari: v14+
Edge: v90+
```

---

## 🛠️ Troubleshooting

### Windows Issues

#### "g++ is not recognized"
**Solution:**
```powershell
# Check if MinGW is installed
where g++

# If not found, add to PATH:
# Control Panel → System → Advanced → Environment Variables
# Add C:\MinGW\bin to PATH
```

#### "npm is not recognized"
**Solution:**
```powershell
# Reinstall Node.js from nodejs.org
# Or repair installation:
# Control Panel → Programs → Node.js → Repair
```

#### Port 3000 already in use
**Solution:**
```powershell
# Find process using port 3000
netstat -ano | findstr :3000

# Kill process
taskkill /PID <PID> /F

# Or change port in vite.config.js
```

#### "Cannot find conio.h"
**Solution:**
```powershell
# Use MinGW (includes conio.h)
# Or use Visual Studio
# Linux users: Use termios alternative
```

---

### Linux Issues

#### "g++ command not found"
**Solution:**
```bash
# Install build-essential
sudo apt install build-essential

# Or for other distros:
sudo dnf install gcc-c++     # Fedora
sudo pacman -S gcc           # Arch
```

#### "node: command not found"
**Solution:**
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### Permission denied when running
**Solution:**
```bash
# Make executable
chmod +x password

# Run
./password
```

#### "conio.h: No such file or directory"
**Solution:**
```bash
# Use the Linux alternative provided above
# Or remove masked input feature
# Replace get_masked_input() with regular getline()
```

---

### macOS Issues

#### "xcrun: error: invalid active developer path"
**Solution:**
```bash
# Install Xcode Command Line Tools
xcode-select --install
```

#### "clang: command not found"
**Solution:**
```bash
# Install Xcode Command Line Tools
xcode-select --install

# Or install full Xcode from App Store
```

#### Port permission issues
**Solution:**
```bash
# Run with sudo (not recommended)
sudo npm run dev

# Or change port in vite.config.js to 3001+
```

---

### React Common Issues

#### "Cannot find module"
**Solution:**
```bash
# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

#### Build errors
**Solution:**
```bash
# Clear cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### Blank page after build
**Solution:**
```bash
# Check browser console (F12)
# Clear browser cache
# Hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
```

#### Styles not loading
**Solution:**
```bash
# Ensure Tailwind is installed
npm install -D tailwindcss postcss autoprefixer

# Regenerate config
npx tailwindcss init -p

# Restart dev server
npm run dev
```

---

## 📱 Alternative Installation Methods

### Using Docker (All Platforms)

**React Version:**
```dockerfile
# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
```

**Run:**
```bash
docker build -t password-manager .
docker run -p 3000:3000 password-manager
```

### Using WSL (Windows Subsystem for Linux)

**Step 1: Enable WSL**
```powershell
wsl --install
```

**Step 2: Install Ubuntu**
```powershell
wsl --install -d Ubuntu
```

**Step 3: Follow Linux Instructions**
```bash
# Inside WSL
cd /mnt/f/Agiann
# Follow Linux installation steps
```

---

## 🎯 Quick Start Scripts

### Create setup.sh (Linux/Mac)
```bash
#!/bin/bash

echo "Password Manager Setup"
echo "======================"

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo "Node.js not found. Please install it first."
    exit 1
fi

# Install React dependencies
cd password-manager-react
echo "Installing dependencies..."
npm install

echo "Setup complete!"
echo "Run 'npm run dev' to start"
```

**Make executable:**
```bash
chmod +x setup.sh
./setup.sh
```

---

## 📊 Installation Verification

### Verify C++ Setup
```bash
# Check compiler
g++ --version

# Try compiling
g++ password.cpp -o password_test

# If successful
echo "✓ C++ setup complete"
```

### Verify React Setup
```bash
# Check Node.js
node --version

# Check npm
npm --version

# Check dependencies
cd password-manager-react
npm list --depth=0

# If no errors
echo "✓ React setup complete"
```

---

## 🆘 Getting More Help

### Command Line Help
```bash
# C++
g++ --help

# Node/npm
npm help
node --help

# Check installed packages
npm list -g --depth=0
```

### Online Resources
- Node.js Docs: https://nodejs.org/docs
- npm Docs: https://docs.npmjs.com
- React Docs: https://react.dev
- Vite Docs: https://vitejs.dev
- Tailwind Docs: https://tailwindcss.com

### Community Support
- Stack Overflow: Tag with `react`, `nodejs`, or `c++`
- GitHub Issues: For package-specific problems
- Reddit: r/reactjs, r/cpp_questions

---

## ✅ Post-Installation Checklist

- [ ] C++ compiler installed and working
- [ ] Node.js v16+ installed
- [ ] npm working
- [ ] Can compile C++ code
- [ ] Can run React dev server
- [ ] Browser opens localhost:3000
- [ ] No error messages
- [ ] Master password creation works
- [ ] Can add/view passwords

---

**Installation complete? Start using your Password Manager! 🎉**

For usage instructions, see `USAGE_GUIDE.md`
