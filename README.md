# Password Manager - C++ & React Version

A complete password manager with both C++ console and modern React web versions.

## 🎯 Features

### All Versions Include:
- ✅ Master password authentication
- ✅ XOR encryption/decryption
- ✅ Password strength indicator (1-7 scale)
- ✅ Add, view, update, delete passwords
- ✅ Random password generator
- ✅ Priority queue sorting by strength
- ✅ Timestamps for all entries
- ✅ **Password expiry system** (90 days, with status: Valid/Expiring Soon/Expired)
- ✅ **Search passwords** by title or username
- ✅ **Export passwords** to text file
- ✅ **Login attempt limit** (max 3 attempts)
- ✅ **Masked password input**

---

## 📁 C++ Version

### New Features Added:
1. **Password Expiry** - Automatic 90-day expiry with status indicators
2. **Search Function** - Search by title or username (partial match)
3. **Export Feature** - Export decrypted passwords to `exported_passwords.txt`
4. **Login Attempts** - Maximum 3 attempts to enter master password
5. **Masked Input** - Passwords shown as `*` when typing (using `conio.h`)

### How to Run:
```bash
# Compile
g++ password.cpp -o password

# Run
./password
```

### Files Created:
- `master.txt` - Stores hashed master password
- `passwords.txt` - Stores encrypted passwords
- `exported_passwords.txt` - Exported passwords (when using export feature)

---

## 🌐 React Version

### Tech Stack:
- React 18 + Vite
- TailwindCSS (Dark Theme)
- Zustand (State Management)
- Framer Motion (Animations)
- React Icons
- React Router

### Features:
- 🎨 Modern dark UI with glassmorphism
- 🔐 Secure LocalStorage encryption
- 🎭 Smooth animations and transitions
- 📱 Responsive design
- 🔍 Real-time search
- 📊 Password strength visualization
- ⏰ Expiry status tracking
- 📋 Copy to clipboard
- 💾 Export to file

### How to Run:

#### 1. Install Dependencies
```bash
cd password-manager-react
npm install
```

#### 2. Start Development Server
```bash
npm run dev
```

#### 3. Build for Production
```bash
npm run build
```

### Pages:
1. **Login** - Master password authentication
2. **Dashboard** - Overview with statistics
3. **All Passwords** - View and manage all passwords
4. **Add Password** - Create new password entry
5. **Edit Password** - Update existing password
6. **Settings** - Export data and manage app

### LocalStorage Keys:
- `masterPassword` - Hashed master password
- `passwordList` - Array of encrypted passwords

---

## 🔐 Security Features

### Encryption:
- XOR encryption with custom key per password
- Base64 encoding for safe storage
- Master password hashing

### Password Strength:
- Length checks (8+, 12+ characters)
- Character variety (uppercase, lowercase, digits, special)
- Score: 1-7 (Weak/Fair/Good/Strong)

### Expiry System:
- **Valid** - More than 7 days remaining
- **Expiring Soon** - 7 days or less remaining
- **Expired** - Past expiry date

---

## 📦 Project Structure

```
password-manager-react/
├── src/
│   ├── components/
│   │   ├── Button.jsx          # Reusable button component
│   │   ├── Input.jsx           # Form input component
│   │   ├── Modal.jsx           # Modal dialog component
│   │   ├── Navbar.jsx          # Navigation sidebar
│   │   ├── PasswordCard.jsx    # Password display card
│   │   └── SearchBar.jsx       # Search input component
│   ├── pages/
│   │   ├── Login.jsx           # Login/registration page
│   │   ├── Dashboard.jsx       # Main dashboard
│   │   ├── AddPassword.jsx     # Add new password
│   │   ├── EditPassword.jsx    # Edit existing password
│   │   ├── AllPasswords.jsx    # View all passwords
│   │   └── Settings.jsx        # Settings and export
│   ├── store/
│   │   └── passwordStore.js    # Zustand state management
│   ├── utils/
│   │   ├── crypto.js           # Encryption and password functions
│   │   └── storage.js          # LocalStorage operations
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # App entry point
│   └── index.css               # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

---

## 🎨 UI Design

### Color Palette:
- **Background**: `#0a0a0f`
- **Card**: `#141419`
- **Border**: `#1f1f26`
- **Primary**: `#6366f1` (Indigo)
- **Success**: `#10b981` (Green)
- **Warning**: `#f59e0b` (Amber)
- **Danger**: `#ef4444` (Red)

### Design Style:
- Glassmorphism cards
- Rounded corners
- Soft shadows
- Smooth animations
- Card-based layout

---

## 📝 Variable Names (Simple & Clear)

### C++:
- `pass` - Password structure
- `title` - Site/app name
- `user` - Username
- `key` - Encryption key
- `level` - Strength level
- `status` - Expiry status

### React:
- `passList` - Array of passwords
- `newPass` - New password object
- `user` - Username field
- `site` - Site/title field
- `level` - Strength level
- `date` - Timestamp
- `key` - Encryption key

---

## 🚀 Quick Start Guide

### C++ Version:
1. Open `password.cpp`
2. Compile: `g++ password.cpp -o password`
3. Run: `./password`
4. Create master password (first time)
5. Start managing passwords!

### React Version:
1. Navigate to project: `cd password-manager-react`
2. Install: `npm install`
3. Run: `npm run dev`
4. Open: `http://localhost:3000`
5. Create master password (first time)
6. Start managing passwords!

---

## ⚠️ Important Notes

1. **Master Password**: Cannot be recovered if forgotten!
2. **Encryption Keys**: Save them - needed for decryption!
3. **Export File**: Contains unencrypted passwords - keep secure!
4. **LocalStorage**: Data stored in browser - clear cache = lose data
5. **Backup**: Export passwords regularly for safety

---

## 🎓 Student-Friendly Code

- Simple variable names
- Clear comments
- Easy-to-understand logic
- Well-organized structure
- No complex patterns

---

## 📱 Screenshots

### React Version Features:
- 🎯 Clean dashboard with statistics
- 🔍 Instant search functionality
- 🎨 Beautiful password cards
- 📊 Visual strength indicators
- ⏰ Expiry status badges
- 📋 One-click copy to clipboard
- 🎭 Smooth page transitions

---

## 🛠️ Customization

### Change Colors:
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: '#your-color',
}
```

### Change Expiry Days:
Edit `crypto.js`:
```javascript
date.setDate(date.getDate() + 90); // Change 90 to your value
```

---

## 📄 License

Free to use for educational purposes.

---

## 👨‍💻 Author

Created as a student-friendly password manager project.

---

Enjoy your secure password manager! 🔐✨
