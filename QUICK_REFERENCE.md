# 🔐 Password Manager - Quick Reference Card

## 🚀 Quick Start

### C++ Version
```bash
# Windows
run-cpp.bat

# Manual
g++ password.cpp -o password
./password
```

### React Version
```bash
# Windows
setup-react.bat

# Manual
cd password-manager-react
npm install
npm run dev
```

---

## 🎯 C++ Menu Options

| # | Action | What It Does |
|---|--------|--------------|
| 1 | Add Password | Save new password (encrypted) |
| 2 | View Passwords | See all saved passwords |
| 3 | Decrypt Password | Reveal a password |
| 4 | Update Password | Change existing password |
| 5 | Delete Password | Remove password |
| 6 | Generate Password | Create random strong password |
| 7 | Search Passwords | Find by title/username |
| 8 | Export Passwords | Save to text file |
| 9 | Exit | Close program |

---

## 🌐 React Pages

| Page | URL | Purpose |
|------|-----|---------|
| Login | `/` | Master password auth |
| Dashboard | `/dashboard` | Statistics & overview |
| All Passwords | `/passwords` | View & manage all |
| Add Password | `/add` | Create new password |
| Edit Password | `/edit` | Update password |
| Settings | `/settings` | Export & manage data |

---

## 🔑 Key Features

### Security
- 🔒 XOR Encryption
- 🔐 Master Password
- 🎯 Unique Keys
- 🔢 3 Login Attempts
- 👁️ Masked Input

### Password Tools
- 💪 Strength: 1-7 scale
- 🎲 Auto Generator
- ⏰ 90-Day Expiry
- 🔍 Smart Search
- 📊 Sort by Strength

### Status Colors
- 🟢 Valid (7+ days)
- 🟡 Expiring Soon (≤7 days)
- 🔴 Expired

---

## 💾 Storage

### C++ Files
- `master.txt` - Master password hash
- `passwords.txt` - Encrypted passwords
- `exported_passwords.txt` - Export file

### React LocalStorage
- `masterPassword` - Master hash
- `passwordList` - Password array

---

## 🎨 React UI Colors

```
Background:  #0a0a0f (Dark)
Cards:       #141419 (Dark Gray)
Primary:     #6366f1 (Indigo)
Success:     #10b981 (Green)
Warning:     #f59e0b (Amber)
Danger:      #ef4444 (Red)
```

---

## 📋 Password Strength

| Score | Level | Requirements |
|-------|-------|--------------|
| 1-2 | Weak | Short, simple |
| 3-4 | Fair | Some variety |
| 5-6 | Good | Mixed characters |
| 7 | Strong | 12+ chars, all types |

---

## 🔧 Troubleshooting

### C++ Issues
```
conio.h error → Install MinGW
g++ not found → Add to PATH
File not saving → Check permissions
```

### React Issues
```
npm error → Update Node.js
Port in use → Change in vite.config.js
Blank page → Clear browser cache
```

---

## 💡 Quick Tips

### Do's ✅
- Use strong master password
- Save encryption keys
- Export regularly
- Update weak passwords
- Review expiry warnings

### Don'ts ❌
- Share master password
- Forget encryption keys
- Clear browser data (React)
- Reuse same keys
- Ignore security warnings

---

## 🎯 Common Tasks

### Add New Password
1. Choose "Add Password"
2. Enter title (e.g., Gmail)
3. Enter username
4. Enter/generate password
5. Enter encryption key
6. Save

### Search Password
1. Use Search feature
2. Type title or username
3. View results
4. Get key from result
5. Decrypt if needed

### Export Data
1. Go to Settings/Menu 8
2. Confirm export
3. File saved
4. Keep secure!

---

## 📞 Emergency Help

### Lost Master Password
```
C++:   Delete master.txt (loses all data)
React: Clear LocalStorage (loses all data)
```

### Lost Encryption Key
```
Cannot decrypt that password
Other passwords unaffected
```

### Data Lost
```
Prevention: Export regularly
Recovery: Import from export file
```

---

## 🎓 File Locations

```
📁 Project Root
├── 📄 password.cpp          (C++ source)
├── 📄 run-cpp.bat          (C++ helper)
├── 📄 setup-react.bat      (React helper)
├── 📄 README.md            (Overview)
├── 📄 USAGE_GUIDE.md       (Detailed guide)
├── 📄 IMPLEMENTATION_SUMMARY.md
├── 📄 QUICK_REFERENCE.md   (This file)
└── 📁 password-manager-react/
    ├── 📁 src/
    │   ├── 📁 components/
    │   ├── 📁 pages/
    │   ├── 📁 store/
    │   └── 📁 utils/
    └── 📄 package.json
```

---

## ⌨️ Keyboard Shortcuts (React)

```
Tab       → Navigate fields
Enter     → Submit forms
Esc       → Close modals
Ctrl+F    → Focus search
```

---

## 📊 Quick Stats Access

### C++ Console
- Menu Option 2 shows all

### React Dashboard
- Total passwords
- Weak count
- Expiring soon
- Expired count

---

## 🚨 Security Checklist

Before Adding Password:
- [ ] Choose unique key
- [ ] Generate strong password
- [ ] Save key somewhere
- [ ] Verify strength > 5

Monthly Review:
- [ ] Check expired passwords
- [ ] Update weak passwords
- [ ] Export backup
- [ ] Clean unused entries

---

## 🎯 Performance Tips

### C++ Version
- Search before view all
- Export only when needed
- Delete unused passwords

### React Version
- Use search to filter
- Clear old passwords
- Export monthly backups
- Don't store 1000+ passwords

---

## 📱 React UI Quick Actions

### Password Card
- 👁️ Show/Hide → Toggle visibility
- 📋 Copy → Copy to clipboard
- ✏️ Edit → Open edit page
- 🗑️ Delete → Remove password

### Dashboard
- ➕ Add → Quick add
- 👀 View All → See passwords
- 📤 Export → Download file

---

## 🔍 Search Tips

### Partial Match
```
Search: "gma"
Finds: Gmail, Gmail-work, gmailbackup
```

### Case Insensitive
```
Search: "FACE"
Finds: Facebook, facebook, FaceTime
```

### Multiple Words
```
Search by title OR username
Both fields checked
```

---

## 💻 Commands Cheat Sheet

### C++ Compile
```bash
# Windows
g++ password.cpp -o password.exe

# Linux/Mac
g++ password.cpp -o password
```

### React Dev
```bash
npm install    # Install dependencies
npm run dev    # Start dev server
npm run build  # Build for production
```

### File Operations
```bash
# View files
dir          # Windows
ls           # Linux/Mac

# Delete files
del master.txt         # Windows
rm master.txt          # Linux/Mac
```

---

## 🎨 Customization Quick Guide

### Change Expiry Days (React)
File: `src/utils/crypto.js`
```javascript
date.setDate(date.getDate() + 90); // Change 90
```

### Change Theme Colors (React)
File: `tailwind.config.js`
```javascript
primary: '#6366f1', // Change color
```

### Change Login Attempts (C++)
File: `password.cpp`
```cpp
for (int attempt = 1; attempt <= 3; attempt++) // Change 3
```

---

## ✅ Pre-Flight Checklist

Before First Use:
- [ ] Node.js installed (React)
- [ ] G++ installed (C++)
- [ ] Folder permissions OK
- [ ] Ports available (React)

Before Adding Data:
- [ ] Master password ready
- [ ] Encryption keys planned
- [ ] Backup strategy ready

---

## 🎯 Use Cases

### Personal Use
- Email accounts
- Social media
- Banking apps
- Work accounts

### Team Use
- Shared accounts
- Project credentials
- API keys
- Server passwords

### Study Project
- Learn encryption
- Practice React
- Understand C++
- Portfolio piece

---

**Keep This Card Handy!** 📌

For detailed help, see:
- `USAGE_GUIDE.md` - Full documentation
- `README.md` - Project overview
- `IMPLEMENTATION_SUMMARY.md` - Technical details

**Happy Password Managing! 🔐**
