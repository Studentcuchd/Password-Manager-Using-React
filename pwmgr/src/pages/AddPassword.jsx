import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiLock, FiUser, FiKey, FiRefreshCw, FiEye, FiEyeOff } from 'react-icons/fi';
import usePasswordStore from '../store/passwordStore';
import { generatePassword, calculateStrength, getStrengthLevel, getStrengthColor } from '../utils/crypto';
import Input from '../components/Input';
import Button from '../components/Button';

// Add password page component
const AddPassword = () => {
  const navigate = useNavigate();
  const addNewPass = usePasswordStore(state => state.addNewPass);
  
  const [formData, setFormData] = useState({
    title: '',
    user: '',
    pass: '',
    key: '',
  });
  
  const [showPass, setShowPass] = useState(false);
  const [strength, setStrength] = useState(0);
  
  // Handle input changes
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    
    // Update strength when password changes
    if (field === 'pass') {
      setStrength(calculateStrength(value));
    }
  };
  
  // Generate random password
  const handleGenerate = () => {
    const newPass = generatePassword(16);
    setFormData({ ...formData, pass: newPass });
    setStrength(calculateStrength(newPass));
  };
  
  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.key) {
      alert('Please enter an encryption key');
      return;
    }
    
    addNewPass(formData);
    navigate('/passwords');
  };
  
  const strengthText = getStrengthLevel(strength);
  const strengthColor = getStrengthColor(strength);
  
  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-dark-text mb-2">Add New Password</h1>
        <p className="text-dark-muted mb-8">Save a new password to your vault</p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-xl p-8"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title input */}
          <Input
            label="Title"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="e.g., Gmail, Facebook, Instagram"
            required
            icon={FiLock}
          />
          
          {/* Username input */}
          <Input
            label="Username / Email"
            value={formData.user}
            onChange={(e) => handleChange('user', e.target.value)}
            placeholder="e.g., user@example.com"
            required
            icon={FiUser}
          />
          
          {/* Password input with generator */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-dark-text">
                Password <span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                onClick={handleGenerate}
                className="text-sm text-primary hover:text-primary-dark transition-colors flex items-center gap-1"
              >
                <FiRefreshCw /> Generate Strong Password
              </button>
            </div>
            
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-muted" />
              
              <input
                type={showPass ? 'text' : 'password'}
                value={formData.pass}
                onChange={(e) => handleChange('pass', e.target.value)}
                placeholder="Enter password"
                required
                className="w-full bg-dark-bg border border-dark-border rounded-xl pl-12 pr-12 py-3 text-dark-text placeholder:text-dark-muted focus:outline-none focus:border-primary transition-colors"
              />
              
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-muted hover:text-dark-text transition-colors"
              >
                {showPass ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            
            {/* Strength indicator */}
            {formData.pass && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-dark-muted">
                    Strength: {strengthText}
                  </span>
                  <span className="text-xs text-dark-muted">{strength}/7</span>
                </div>
                <div className="w-full bg-dark-bg rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(strength / 7) * 100}%` }}
                    transition={{ duration: 0.3 }}
                    className="h-2 rounded-full"
                    style={{ backgroundColor: strengthColor }}
                  />
                </div>
              </motion.div>
            )}
          </div>
          
          {/* Encryption key input */}
          <Input
            label="Encryption Key"
            value={formData.key}
            onChange={(e) => handleChange('key', e.target.value)}
            placeholder="Enter a key to encrypt this password"
            required
            icon={FiKey}
          />
          
          <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
            <p className="text-xs text-dark-muted">
              <strong className="text-primary">Note:</strong> Save your encryption key! 
              You'll need it to decrypt this password later.
            </p>
          </div>
          
          {/* Action buttons */}
          <div className="flex gap-4">
            <Button type="submit" variant="primary" fullWidth>
              Save Password
            </Button>
            <Button
              type="button"
              variant="secondary"
              fullWidth
              onClick={() => navigate('/passwords')}
            >
              Cancel
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddPassword;
