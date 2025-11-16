// XOR encryption and decryption function
export const encrypt = (text, key) => {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return btoa(result); // Base64 encode for safe storage
};

// Decrypt function (same as encrypt for XOR)
export const decrypt = (encoded, key) => {
  try {
    const text = atob(encoded); // Base64 decode
    let result = '';
    for (let i = 0; i < text.length; i++) {
      result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return result;
  } catch (error) {
    return '';
  }
};

// Simple hash function for master password
export const hashPassword = (pass) => {
  let hash = '';
  for (let i = pass.length - 1; i >= 0; i--) {
    hash += String.fromCharCode(pass.charCodeAt(i) + 1);
  }
  return btoa(hash);
};

// Calculate password strength (1-7 scale)
export const calculateStrength = (pass) => {
  let score = 0;
  
  // Length checks
  if (pass.length >= 8) score++;
  if (pass.length >= 12) score++;
  
  // Character type checks
  const hasUpper = /[A-Z]/.test(pass);
  const hasLower = /[a-z]/.test(pass);
  const hasDigit = /[0-9]/.test(pass);
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pass);
  
  if (hasUpper) score++;
  if (hasLower) score++;
  if (hasDigit) score++;
  if (hasSpecial) score++;
  
  return Math.min(score, 7);
};

// Get strength level text
export const getStrengthLevel = (score) => {
  if (score >= 7) return 'Strong';
  if (score >= 5) return 'Good';
  if (score >= 3) return 'Fair';
  return 'Weak';
};

// Get strength color for UI
export const getStrengthColor = (score) => {
  if (score >= 7) return '#10b981'; // Green
  if (score >= 5) return '#3b82f6'; // Blue
  if (score >= 3) return '#f59e0b'; // Yellow
  return '#ef4444'; // Red
};

// Generate random password
export const generatePassword = (length = 16) => {
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const digits = '0123456789';
  const special = '!@#$%^&*()-_=+[]{};:,.<>?';
  const all = upper + lower + digits + special;
  
  let pass = '';
  // Ensure at least one of each type
  pass += upper[Math.floor(Math.random() * upper.length)];
  pass += lower[Math.floor(Math.random() * lower.length)];
  pass += digits[Math.floor(Math.random() * digits.length)];
  pass += special[Math.floor(Math.random() * special.length)];
  
  // Fill remaining length
  for (let i = 4; i < length; i++) {
    pass += all[Math.floor(Math.random() * all.length)];
  }
  
  // Shuffle the password
  return pass.split('').sort(() => Math.random() - 0.5).join('');
};

// Calculate expiry date (90 days from now)
export const calculateExpiry = (creationDate) => {
  const date = new Date(creationDate);
  date.setDate(date.getDate() + 90);
  return date.toISOString();
};

// Check expiry status
export const checkExpiry = (expiryDate) => {
  const now = new Date();
  const expiry = new Date(expiryDate);
  const diffDays = Math.floor((expiry - now) / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) return 'Expired';
  if (diffDays <= 7) return 'Expiring Soon';
  return 'Valid';
};

// Get expiry status color
export const getExpiryColor = (status) => {
  if (status === 'Expired') return '#ef4444'; // Red
  if (status === 'Expiring Soon') return '#f59e0b'; // Yellow
  return '#10b981'; // Green
};

// Format date for display
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Copy text to clipboard
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    return false;
  }
};
