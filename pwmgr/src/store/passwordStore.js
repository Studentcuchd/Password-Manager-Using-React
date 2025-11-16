import { create } from 'zustand';
import {
  getPasswordList,
  addPassword as addToStorage,
  updatePassword as updateInStorage,
  deletePassword as deleteFromStorage,
  savePasswordList,
} from '../utils/storage';
import {
  encrypt,
  decrypt,
  calculateStrength,
  getStrengthLevel,
  calculateExpiry,
  checkExpiry,
} from '../utils/crypto';

// Zustand store for password management
const usePasswordStore = create((set, get) => ({
  // State variables
  passList: [],
  isAuthenticated: false,
  searchQuery: '',
  selectedPass: null,
  
  // Load passwords from localStorage
  loadPasswords: () => {
    const list = getPasswordList();
    set({ passList: list });
  },
  
  // Add new password
  addNewPass: (data) => {
    const { title, user, pass, key } = data;
    
    // Encrypt password
    const encrypted = encrypt(pass, key);
    
    // Calculate strength
    const level = calculateStrength(pass);
    const strengthText = getStrengthLevel(level);
    
    // Calculate expiry
    const now = new Date().toISOString();
    const expiry = calculateExpiry(now);
    const status = checkExpiry(expiry);
    
    // Create new password object
    const newPass = {
      id: Date.now().toString(),
      title,
      user,
      encrypted,
      key,
      level,
      strengthText,
      timestamp: now,
      expiry,
      status,
    };
    
    // Add to storage and update state
    const currentList = get().passList;
    const updatedList = [...currentList, newPass];
    savePasswordList(updatedList);
    set({ passList: updatedList });
    
    return newPass;
  },
  
  // Update existing password
  updatePass: (id, data) => {
    const { pass, key } = data;
    
    // Encrypt new password
    const encrypted = encrypt(pass, key);
    
    // Calculate new strength
    const level = calculateStrength(pass);
    const strengthText = getStrengthLevel(level);
    
    // Calculate new expiry
    const now = new Date().toISOString();
    const expiry = calculateExpiry(now);
    const status = checkExpiry(expiry);
    
    // Update in list
    const currentList = get().passList;
    const updatedList = currentList.map(p => {
      if (p.id === id) {
        return {
          ...p,
          ...data,
          encrypted,
          level,
          strengthText,
          timestamp: now,
          expiry,
          status,
        };
      }
      return p;
    });
    
    savePasswordList(updatedList);
    set({ passList: updatedList });
  },
  
  // Delete password
  deletePass: (id) => {
    const currentList = get().passList;
    const updatedList = currentList.filter(p => p.id !== id);
    savePasswordList(updatedList);
    set({ passList: updatedList });
  },
  
  // Get decrypted password
  getDecryptedPass: (id) => {
    const pass = get().passList.find(p => p.id === id);
    if (!pass) return null;
    return decrypt(pass.encrypted, pass.key);
  },
  
  // Search passwords
  setSearchQuery: (query) => {
    set({ searchQuery: query });
  },
  
  // Get filtered passwords based on search
  getFilteredPasswords: () => {
    const { passList, searchQuery } = get();
    if (!searchQuery) return passList;
    
    const lowerQuery = searchQuery.toLowerCase();
    return passList.filter(p =>
      p.title.toLowerCase().includes(lowerQuery) ||
      p.user.toLowerCase().includes(lowerQuery)
    );
  },
  
  // Sort passwords by strength
  getSortedPasswords: () => {
    const filtered = get().getFilteredPasswords();
    return [...filtered].sort((a, b) => b.level - a.level);
  },
  
  // Select password for editing
  selectPass: (pass) => {
    set({ selectedPass: pass });
  },
  
  // Clear selection
  clearSelection: () => {
    set({ selectedPass: null });
  },
  
  // Set authentication status
  setAuthenticated: (status) => {
    set({ isAuthenticated: status });
  },
  
  // Update expiry status for all passwords
  updateExpiryStatus: () => {
    const currentList = get().passList;
    const updatedList = currentList.map(p => ({
      ...p,
      status: checkExpiry(p.expiry),
    }));
    savePasswordList(updatedList);
    set({ passList: updatedList });
  },
}));

export default usePasswordStore;
