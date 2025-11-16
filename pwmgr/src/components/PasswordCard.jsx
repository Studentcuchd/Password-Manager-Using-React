import { motion } from 'framer-motion';
import { FiLock, FiEye, FiEyeOff, FiCopy, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useState } from 'react';
import { copyToClipboard, formatDate, getStrengthColor, getExpiryColor } from '../utils/crypto';
import usePasswordStore from '../store/passwordStore';

// Password card component with glassmorphism design
const PasswordCard = ({ pass, onEdit, onDelete }) => {
  const [showPass, setShowPass] = useState(false);
  const [copied, setCopied] = useState(false);
  const getDecryptedPass = usePasswordStore(state => state.getDecryptedPass);
  
  // Handle copy password
  const handleCopy = async () => {
    const decrypted = getDecryptedPass(pass.id);
    const success = await copyToClipboard(decrypted);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  // Handle show/hide password
  const handleToggleShow = () => {
    setShowPass(!showPass);
  };
  
  // Get decrypted password for display
  const displayPassword = showPass ? getDecryptedPass(pass.id) : '••••••••';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="glass rounded-xl p-5 card-hover"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-dark-text mb-1">{pass.title}</h3>
          <p className="text-sm text-dark-muted">{pass.user}</p>
        </div>
        
        {/* Status badge */}
        <div
          className="px-3 py-1 rounded-full text-xs font-medium"
          style={{
            backgroundColor: `${getExpiryColor(pass.status)}20`,
            color: getExpiryColor(pass.status),
          }}
        >
          {pass.status}
        </div>
      </div>
      
      {/* Password display */}
      <div className="flex items-center gap-2 mb-4 bg-dark-bg rounded-lg p-3">
        <FiLock className="text-dark-muted" />
        <span className="flex-1 text-dark-text font-mono text-sm">{displayPassword}</span>
        
        {/* Action buttons */}
        <button
          onClick={handleToggleShow}
          className="p-2 hover:bg-dark-card rounded-lg transition-colors"
          title={showPass ? 'Hide password' : 'Show password'}
        >
          {showPass ? <FiEyeOff className="text-dark-muted" /> : <FiEye className="text-dark-muted" />}
        </button>
        
        <button
          onClick={handleCopy}
          className="p-2 hover:bg-dark-card rounded-lg transition-colors"
          title="Copy password"
        >
          <FiCopy className={copied ? 'text-green-500' : 'text-dark-muted'} />
        </button>
      </div>
      
      {/* Strength indicator */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-dark-muted">Strength: {pass.strengthText}</span>
          <span className="text-xs text-dark-muted">{pass.level}/7</span>
        </div>
        <div className="w-full bg-dark-bg rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(pass.level / 7) * 100}%` }}
            transition={{ duration: 0.5 }}
            className="h-2 rounded-full"
            style={{ backgroundColor: getStrengthColor(pass.level) }}
          />
        </div>
      </div>
      
      {/* Footer with actions */}
      <div className="flex items-center justify-between text-xs text-dark-muted">
        <span>{formatDate(pass.timestamp)}</span>
        
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(pass)}
            className="p-2 hover:bg-primary/20 hover:text-primary rounded-lg transition-colors"
            title="Edit password"
          >
            <FiEdit2 />
          </button>
          
          <button
            onClick={() => onDelete(pass.id)}
            className="p-2 hover:bg-red-500/20 hover:text-red-500 rounded-lg transition-colors"
            title="Delete password"
          >
            <FiTrash2 />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PasswordCard;
