# 🚀 Password Manager - Complete Usage Guide

## 📋 Table of Contents
1. [C++ Version Guide](#cpp-version)
2. [React Version Guide](#react-version)
3. [Features Overview](#features)
4. [Troubleshooting](#troubleshooting)

---

## 🔷 C++ Version

### ✅ Requirements
- C++ compiler (g++, MinGW, or Visual Studio)
- Windows: `conio.h` support (included in MinGW/MSVC)

### 🎯 Quick Start

#### Windows:
```bash
# Easy way - use the batch file
run-cpp.bat

# Manual way
g++ password.cpp -o password.exe
password.exe
```

#### Linux/Mac:
```bash
g++ password.cpp -o password
./password
```

### 📝 First Time Setup
1. Run the program
2. You'll see: "No master password found"
3. Create a master password (min 8 characters)
4. Password will be hidden as you type (shows *)
5. Press Enter when done

### 🎮 Menu Options

#### 1️⃣ Add New Password
```
Enter title: Gmail
Enter username: user@gmail.com
Enter password: ******** (hidden input)
```
**Result:**
- Password encrypted with random key
- Strength calculated (1-7)
- Expiry set to 90 days
- Encryption key displayed (SAVE IT!)

#### 2️⃣ View Stored Passwords
Shows table with:
- Title
- Username
- Strength (e.g., 5/7 Good)
- Encrypted password
- Encryption key
- Expiry Status (Valid/Expiring Soon/Expired)
- Timestamp

#### 3️⃣ Decrypt a Password
```
Enter title: Gmail
Enter username: user@gmail.com
Enter encryption key: A
```
**Result:** Shows decrypted password

#### 4️⃣ Update Existing Password
```
Enter title: Gmail
Enter username: user@gmail.com
Enter new password: ******** (hidden)
```
**Result:**
- Password updated
- Strength recalculated
- Expiry reset to 90 days

#### 5️⃣ Delete a Password
```
Enter title: Gmail
Enter username: user@gmail.com
```
**Result:** Password removed from storage

#### 6️⃣ Generate Random Password
```
Enter site name: Instagram
Enter length: 16
```
**Result:**
- Strong password generated
- Strength displayed
- Copy and use it!

#### 7️⃣ Search Passwords
```
Enter search term: gmail
```
**Result:**
- Shows all matching passwords
- Partial search supported
- Case-insensitive

#### 8️⃣ Export All Passwords
**Result:**
- Creates `exported_passwords.txt`
- Contains DECRYPTED passwords
- ⚠️ Keep file secure!

Example export format:
```
========================================
   EXPORTED PASSWORDS (DECRYPTED)
========================================

Entry #1
Title: Gmail
Username/Email: user@gmail.com
Password: MyPassword123!
Strength: 6/7 (Good)
Status: Valid
Created: Sat Nov 16 10:30:45 2025
Expires: Thu Feb 14 10:30:45 2026
----------------------------------------
```

### 🔐 Security Features

**Login Attempts:**
- Maximum 3 attempts
- Access denied after failed attempts
- Must restart program

**Password Masking:**
- All password inputs show `*`
- Backspace works
- Enter to submit

**Expiry Status:**
- **Valid**: More than 7 days left
- **Expiring Soon**: 7 days or less
- **Expired**: Past expiry date

---

## 🔷 React Version

### ✅ Requirements
- Node.js (v16 or higher)
- npm or yarn
- Modern web browser

### 🎯 Quick Start

#### Windows (Easy Way):
```bash
# Double-click this file:
setup-react.bat
```

#### Manual Installation:
```bash
cd password-manager-react
npm install
npm run dev
```

#### Open in Browser:
```
http://localhost:3000
```

### 📱 First Time Setup

1. **Login Screen Appears**
   - First time? Create master password
   - Minimum 8 characters
   - Confirm password
   - Click "Create Master Password"

2. **Dashboard Opens**
   - See statistics
   - Quick actions available
   - Navigation sidebar ready

### 🎯 Page-by-Page Guide

---

### 📊 Dashboard Page

**What You See:**
- Total Passwords count
- Weak Passwords warning
- Expiring Soon count
- Expired count
- Quick action buttons
- Security recommendations

**Quick Actions:**
- Add New Password
- View All Passwords
- Export Passwords

---

### 🔐 Add Password Page

**Step-by-Step:**

1. **Enter Title**
   ```
   Example: Gmail, Facebook, Instagram
   ```

2. **Enter Username**
   ```
   Example: user@example.com
   ```

3. **Enter Password**
   - Type manually, OR
   - Click "Generate Strong Password"
   - Click eye icon to show/hide
   - Strength bar updates live

4. **Enter Encryption Key**
   ```
   Example: MySecretKey123
   ⚠️ Remember this key!
   ```

5. **Click "Save Password"**

**Features:**
- Live strength indicator
- Auto-generate strong passwords
- Password visibility toggle
- Encryption key required

---

### 📋 All Passwords Page

**What You See:**
- Search bar at top
- Password cards in grid
- Each card shows:
  - Title and username
  - Expiry status badge (color-coded)
  - Hidden password (••••••••)
  - Action buttons

**Card Actions:**

1. **👁️ Show/Hide Password**
   - Click eye icon
   - Temporarily reveals password

2. **📋 Copy Password**
   - Click copy icon
   - Password copied to clipboard
   - Icon turns green briefly

3. **✏️ Edit**
   - Click edit icon
   - Opens edit page

4. **🗑️ Delete**
   - Click trash icon
   - Confirmation modal appears

**Search:**
- Type in search bar
- Searches title and username
- Updates instantly
- Case-insensitive

**Status Badges:**
- 🟢 **Valid** (green)
- 🟡 **Expiring Soon** (yellow)
- 🔴 **Expired** (red)

---

### ✏️ Edit Password Page

**How to Edit:**

1. Card opens with current data
2. Change any field you want
3. Password shows decrypted
4. Update strength indicator
5. Click "Update Password"

**What Updates:**
- Title
- Username
- Password
- Encryption key
- Timestamp (auto)
- Expiry date (reset to 90 days)

---

### ⚙️ Settings Page

**Export Passwords:**
1. Click "Export All Passwords"
2. Warning modal appears
3. Confirm export
4. File downloads: `exported_passwords.txt`
5. ⚠️ Contains DECRYPTED passwords!

**Clear All Data (Danger Zone):**
1. Click "Clear All Data"
2. Warning modal with details
3. Confirm action
4. Everything deleted:
   - Master password
   - All saved passwords
   - All settings
5. Redirects to login

**About Section:**
- Version number
- Total passwords
- Storage type
- Encryption method

---

## 🎨 UI Features

### Animations
- Smooth page transitions
- Card hover effects
- Button press animations
- Modal fade in/out
- Progress bars

### Dark Theme
- Easy on eyes
- Modern glassmorphism
- Color-coded status
- Clear contrast

### Responsive
- Works on desktop
- Tablet friendly
- Mobile compatible

---

## 🔐 Features Overview

### All Features (Both Versions)

✅ **Security:**
- Master password login
- XOR encryption
- Unique keys per password
- Hashed master password
- Login attempt limiting (C++)
- Masked password input

✅ **Password Management:**
- Add new passwords
- View all passwords
- Update passwords
- Delete passwords
- Search passwords
- Sort by strength

✅ **Password Tools:**
- Random generator
- Strength calculator (1-7)
- Character variety check
- Length validation

✅ **Expiry System:**
- 90-day default expiry
- Status: Valid/Expiring Soon/Expired
- Color-coded indicators
- Auto-reset on update

✅ **Data Export:**
- Export to text file
- Decrypted passwords
- Formatted output
- Security warning

---

## 🆘 Troubleshooting

### C++ Issues

**Error: "conio.h not found"**
```
Solution:
- Windows: Install MinGW or use Visual Studio
- Linux/Mac: Remove conio.h and use getpass() instead
```

**Error: "g++ not recognized"**
```
Solution:
1. Install MinGW (Windows) or GCC (Linux)
2. Add to PATH environment variable
3. Restart terminal
```

**Passwords not saving**
```
Check:
1. Write permissions in folder
2. passwords.txt exists
3. No antivirus blocking
```

**Master password forgotten**
```
Solution:
Delete master.txt and start over
⚠️ All passwords will be lost!
```

---

### React Issues

**npm install fails**
```
Solution:
1. Update Node.js to v16+
2. Clear npm cache: npm cache clean --force
3. Delete node_modules and package-lock.json
4. Run npm install again
```

**Port 3000 already in use**
```
Solution:
1. Change port in vite.config.js
2. Or kill process using port 3000
```

**Blank page after login**
```
Solution:
1. Clear browser cache
2. Clear LocalStorage (F12 > Application > LocalStorage)
3. Refresh page
4. Try different browser
```

**Data disappeared**
```
Possible causes:
1. Browser cache cleared
2. LocalStorage cleared
3. Different browser used

Prevention:
- Export passwords regularly
- Use same browser
- Don't clear site data
```

**Styles not loading**
```
Solution:
1. Check if Tailwind CSS installed
2. Run: npm install -D tailwindcss postcss autoprefixer
3. Restart dev server
```

---

## 💡 Tips & Best Practices

### Password Security
1. Use unique passwords for each site
2. Generate strong passwords (16+ characters)
3. Update passwords regularly
4. Don't share encryption keys
5. Export and backup regularly

### Master Password
1. Make it strong (12+ characters)
2. Use mix of characters
3. Don't forget it!
4. Write it down securely
5. Don't share it

### Encryption Keys
1. Make them unique
2. Easy to remember
3. Or write them down
4. Don't reuse same key
5. Keep them secret

### Data Management
1. Export monthly
2. Store exports securely
3. Review weak passwords
4. Update expired ones
5. Remove unused entries

---

## 📞 Need Help?

### Common Questions

**Q: Is my data safe?**
A: Data is encrypted and stored locally. No cloud storage.

**Q: Can I recover forgotten master password?**
A: No. Master password cannot be recovered.

**Q: What if I lose encryption keys?**
A: Cannot decrypt those passwords. Keys are essential.

**Q: Can I sync across devices?**
A: No built-in sync. Use export/import manually.

**Q: Is this production-ready?**
A: This is a learning project. For production, use established password managers.

---

## 🎓 Learning Points

This project teaches:
- C++ file handling
- Data structures (priority queue)
- Encryption basics
- React fundamentals
- State management (Zustand)
- LocalStorage API
- Modern UI design
- Form handling
- Routing
- Animation (Framer Motion)

---

Enjoy your password manager! 🔒✨

**Remember:**
- Export regularly
- Keep master password safe
- Update weak passwords
- Review security recommendations
