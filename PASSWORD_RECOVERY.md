# 🔐 Password Recovery Feature - Documentation

## ✨ New Feature Added: Security Questions Recovery

You can now recover your master password if you forget it!

---

## 🎯 How It Works

### For New Users (First Time Setup):

**C++ Version:**
1. Create master password
2. Automatically prompted to answer 3 security questions:
   - What is your mother's maiden name?
   - What was the name of your first pet?
   - What city were you born in?
3. Answers are hashed and stored in `security.txt`
4. ✅ Setup complete!

**React Version:**
1. Create master password
2. Automatically shown security questions setup page
3. Answer all 3 questions
4. Click "Complete Setup"
5. ✅ Ready to use!

---

## 🆘 Password Recovery Process

### C++ Version:

**When You Forget Password:**
1. Try logging in (fails after 3 attempts)
2. System asks: "Do you want to recover your password? (y/n)"
3. Type `y` and press Enter
4. Answer the 3 security questions
5. Need **at least 2 correct answers** (2 out of 3)
6. If verified, create new master password
7. Restart program and login with new password

**Example:**
```
Maximum login attempts reached.

Do you want to recover your password? (y/n): y

=== Password Recovery - Answer Security Questions ===

Question 1: What is your mother's maiden name?
Your answer: Smith

Question 2: What was the name of your first pet?
Your answer: Buddy

Question 3: What city were you born in?
Your answer: Boston

✓ Identity verified! You can now reset your master password.

Enter new master password: ********
Confirm new master password: ********

✓ Master password reset successfully!
You can now login with your new password.

Please restart the program to login with new password.
```

### React Version:

**When You Forget Password:**
1. Try logging in (fails after 3 attempts)
2. "Forgot Password? Recover Now" button appears
3. Click the button
4. Answer all 3 security questions
5. Need **at least 2 correct answers**
6. Enter new master password
7. Confirm new password
8. Click "Reset Password"
9. ✅ Password reset! Login with new password

**Visual Flow:**
```
Login Page (Failed 3x)
      ↓
[Forgot Password? Recover Now] button
      ↓
Recovery Page with:
  - Security questions
  - New password fields
  - Reset/Cancel buttons
      ↓
Verify answers (2/3 correct needed)
      ↓
Password reset successful!
      ↓
Back to login with new password
```

---

## 🔒 Security Features

### Answer Verification:
- ✅ Answers are **case-insensitive** (Smith = smith = SMITH)
- ✅ Answers are **hashed** before storage (not plain text)
- ✅ Need **2 out of 3 correct** (flexible but secure)
- ✅ No limit on recovery attempts

### File Storage (C++):
- `security.txt` - Stores hashed security answers
- Located in same folder as program
- Automatically created on first use

### LocalStorage (React):
- `securityAnswers` - Array of hashed answers
- Stored in browser LocalStorage
- Base64 encoded for added security

---

## 📝 Important Notes

### ✅ Do's:
- Choose memorable, honest answers
- Answer questions consistently
- Write answers down securely (optional)
- Keep answers private
- Use this feature if you forget password

### ❌ Don'ts:
- Don't use random/fake answers you'll forget
- Don't share your security answers
- Don't delete security.txt (C++) or clear LocalStorage (React)
- Don't use same answers as passwords

---

## 🎯 Example Scenarios

### Scenario 1: All Correct ✅
```
Question 1: Mother's maiden name? → Smith ✓
Question 2: First pet's name? → Buddy ✓
Question 3: City born in? → Boston ✓

Result: 3/3 correct → Password reset allowed
```

### Scenario 2: 2 Correct (Still Works) ✅
```
Question 1: Mother's maiden name? → Smith ✓
Question 2: First pet's name? → Max ✗
Question 3: City born in? → Boston ✓

Result: 2/3 correct → Password reset allowed
```

### Scenario 3: Only 1 Correct (Fails) ❌
```
Question 1: Mother's maiden name? → Jones ✗
Question 2: First pet's name? → Max ✗
Question 3: City born in? → Boston ✓

Result: 1/3 correct → Password reset denied
```

---

## 🛠️ Technical Details

### C++ Implementation:

**Files:**
- `security.txt` - Stores hashed answers

**Functions Added:**
```cpp
void setup_security_questions()     // Setup during registration
bool verify_security_answers()      // Verify during recovery
void reset_master_password()        // Reset password after verification
```

**Security:**
- Answers converted to lowercase
- Hashed using same hash function as master password
- Stored one per line in security.txt

### React Implementation:

**Storage Key:**
- `securityAnswers` in LocalStorage

**Functions Added:**
```javascript
saveSecurityAnswers(answers)        // Save during setup
verifySecurityAnswers(answers)      // Verify during recovery
hasSecurityQuestions()              // Check if setup
```

**Security:**
- Answers converted to lowercase
- Base64 encoded before storage
- Verified with same encoding process

---

## 🔧 Troubleshooting

### "No security questions found"
**Cause:** Security questions not set up yet
**Solution:** 
- C++: Delete master.txt, restart, create new password
- React: Clear LocalStorage, refresh, create new password

### "Security data corrupted"
**Cause:** security.txt damaged or incomplete
**Solution:**
- C++: Delete security.txt and master.txt, start fresh
- React: Clear LocalStorage, refresh page

### Recovery not working
**Possible Issues:**
1. Answers typed incorrectly (check spelling)
2. Case sensitivity? (Should work, answers are lowercased)
3. Only 1 answer correct (need at least 2)

**Solution:**
- Try different answer variations
- Check for typos
- If stuck, delete everything and start fresh

---

## 📊 Comparison: Before vs After

| Feature | Before | After |
|---------|--------|-------|
| Forgot password? | ❌ No recovery | ✅ Security questions |
| Lost access? | ❌ Delete everything | ✅ Recover password |
| Security? | 🔒 Very secure | 🔒 Secure + recoverable |
| User-friendly? | ⚠️ Risky if forget | ✅ Much safer |

---

## 🎓 Best Practices

### Choosing Good Answers:

**Good Examples:**
- Mother's maiden name: Use real answer
- First pet: Use actual first pet's name
- City born in: Use real birthplace

**Bad Examples:**
- Random strings: "asdf1234"
- Fake info: "Doesn't matter"
- Too complex: "Ch@rl13Th3C@t!!!"

### Why These Questions?

1. **Personal** - Only you know the answers
2. **Memorable** - Hard to forget
3. **Consistent** - Answers don't change over time
4. **Common** - Standard recovery questions

---

## 💡 Tips & Tricks

### Tip 1: Write Answers Down
- Keep a physical note in a safe place
- Don't store digitally with passwords
- Label it clearly for future reference

### Tip 2: Test Recovery
- After setup, test the recovery process once
- Verify your answers work
- Better to find issues now than later

### Tip 3: Consistent Formatting
- Always answer the same way
- "Smith" vs "smith" doesn't matter (case-insensitive)
- But "Smith" vs "Smith-Jones" does matter

### Tip 4: Backup Strategy
- Security questions = First line of defense
- Regular exports = Second line of defense
- Physical notes = Third line of defense

---

## 🚀 Quick Start

### First Time Users:

**C++:**
```bash
1. Run program
2. Create master password
3. Answer 3 security questions
4. Start using password manager
```

**React:**
```bash
1. Open app in browser
2. Create master password
3. Answer 3 security questions on next page
4. Click "Complete Setup"
5. Start using password manager
```

### If You Forget Password:

**C++:**
```bash
1. Try login (fail 3x)
2. Type 'y' for recovery
3. Answer questions
4. Set new password
5. Restart and login
```

**React:**
```bash
1. Try login (fail 3x)
2. Click "Forgot Password? Recover Now"
3. Answer questions
4. Set new password
5. Click "Reset Password"
6. Login with new password
```

---

## ✅ Feature Checklist

What's Included:

- ✅ 3 security questions
- ✅ Case-insensitive answers
- ✅ Hashed storage (secure)
- ✅ 2 out of 3 verification
- ✅ Password reset after verification
- ✅ Works in both C++ and React
- ✅ Automatic setup for new users
- ✅ Optional recovery for existing users
- ✅ User-friendly UI (React)
- ✅ Clear error messages

---

## 🎉 Summary

**You're now protected against password loss!**

- 🔐 **Secure**: Answers are hashed
- 🎯 **Flexible**: Need 2 of 3 correct
- 💪 **Easy**: Simple question format
- 🚀 **Integrated**: Part of normal flow
- ✅ **Tested**: Works in both versions

**No more losing access to your passwords!** 🎊

---

For more help, see:
- [USAGE_GUIDE.md](USAGE_GUIDE.md) - General usage
- [QUICK_REFERENCE.md](QUICK_REFERENCE.md) - Quick commands
- [README.md](README.md) - Project overview
