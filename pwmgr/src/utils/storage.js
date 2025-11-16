// LocalStorage keys
const MASTER_PASSWORD_KEY = 'masterPassword';
const PASSWORD_LIST_KEY = 'passwordList';
const SECURITY_ANSWERS_KEY = 'securityAnswers';

// Security questions
export const SECURITY_QUESTIONS = [
  "What is your mother's maiden name?",
  "What was the name of your first pet?",
  "What city were you born in?"
];

// Save security answers
export const saveSecurityAnswers = (answers) => {
  // Hash answers before storing
  const hashedAnswers = answers.map(ans => btoa(ans.toLowerCase()));
  localStorage.setItem(SECURITY_ANSWERS_KEY, JSON.stringify(hashedAnswers));
};

// Get security answers
export const getSecurityAnswers = () => {
  const data = localStorage.getItem(SECURITY_ANSWERS_KEY);
  return data ? JSON.parse(data) : null;
};

// Verify security answers
export const verifySecurityAnswers = (answers) => {
  const stored = getSecurityAnswers();
  if (!stored || stored.length !== 3) return false;
  
  // Hash provided answers and compare
  const hashedAnswers = answers.map(ans => btoa(ans.toLowerCase()));
  
  let correctCount = 0;
  for (let i = 0; i < 3; i++) {
    if (hashedAnswers[i] === stored[i]) {
      correctCount++;
    }
  }
  
  // Need at least 2 out of 3 correct
  return correctCount >= 2;
};

// Check if security questions are set up
export const hasSecurityQuestions = () => {
  return getSecurityAnswers() !== null;
};

// Save master password to LocalStorage
export const saveMasterPassword = (hashedPassword) => {
  localStorage.setItem(MASTER_PASSWORD_KEY, hashedPassword);
};

// Get master password from LocalStorage
export const getMasterPassword = () => {
  return localStorage.getItem(MASTER_PASSWORD_KEY);
};

// Check if master password exists
export const hasMasterPassword = () => {
  return localStorage.getItem(MASTER_PASSWORD_KEY) !== null;
};

// Save password list to LocalStorage
export const savePasswordList = (passList) => {
  localStorage.setItem(PASSWORD_LIST_KEY, JSON.stringify(passList));
};

// Get password list from LocalStorage
export const getPasswordList = () => {
  const data = localStorage.getItem(PASSWORD_LIST_KEY);
  return data ? JSON.parse(data) : [];
};

// Add new password to list
export const addPassword = (passData) => {
  const passList = getPasswordList();
  const newPass = {
    id: Date.now().toString(),
    ...passData,
    timestamp: new Date().toISOString(),
  };
  passList.push(newPass);
  savePasswordList(passList);
  return newPass;
};

// Update existing password
export const updatePassword = (id, updatedData) => {
  const passList = getPasswordList();
  const index = passList.findIndex(p => p.id === id);
  if (index !== -1) {
    passList[index] = {
      ...passList[index],
      ...updatedData,
      timestamp: new Date().toISOString(),
    };
    savePasswordList(passList);
    return passList[index];
  }
  return null;
};

// Delete password
export const deletePassword = (id) => {
  const passList = getPasswordList();
  const filtered = passList.filter(p => p.id !== id);
  savePasswordList(filtered);
  return filtered;
};

// Search passwords by title or username
export const searchPasswords = (query) => {
  const passList = getPasswordList();
  const lowerQuery = query.toLowerCase();
  return passList.filter(p => 
    p.title.toLowerCase().includes(lowerQuery) || 
    p.user.toLowerCase().includes(lowerQuery)
  );
};

// Sort passwords by strength (high to low)
export const sortByStrength = (passList) => {
  return [...passList].sort((a, b) => b.level - a.level);
};

// Export passwords to text format
export const exportPasswords = (passList, decryptFn) => {
  let text = '========================================\n';
  text += '   EXPORTED PASSWORDS (DECRYPTED)\n';
  text += '========================================\n\n';
  
  passList.forEach((pass, index) => {
    const decryptedPass = decryptFn(pass.encrypted, pass.key);
    text += `Entry #${index + 1}\n`;
    text += `Title: ${pass.title}\n`;
    text += `Username: ${pass.user}\n`;
    text += `Password: ${decryptedPass}\n`;
    text += `Strength: ${pass.level}/7 (${pass.strengthText})\n`;
    text += `Status: ${pass.status}\n`;
    text += `Created: ${new Date(pass.timestamp).toLocaleString()}\n`;
    text += `Expires: ${new Date(pass.expiry).toLocaleString()}\n`;
    text += '----------------------------------------\n\n';
  });
  
  text += `Total passwords exported: ${passList.length}\n`;
  return text;
};

// Download text as file
export const downloadTextFile = (text, filename) => {
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// Clear all data (for logout or reset)
export const clearAllData = () => {
  localStorage.removeItem(MASTER_PASSWORD_KEY);
  localStorage.removeItem(PASSWORD_LIST_KEY);
  localStorage.removeItem(SECURITY_ANSWERS_KEY);
};
