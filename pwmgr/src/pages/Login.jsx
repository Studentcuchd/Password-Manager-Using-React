import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiLock, FiEye, FiEyeOff, FiHelpCircle } from 'react-icons/fi';
import { 
  hasMasterPassword, 
  getMasterPassword, 
  saveMasterPassword,
  SECURITY_QUESTIONS,
  saveSecurityAnswers,
  verifySecurityAnswers,
  hasSecurityQuestions
} from '../utils/storage';
import { hashPassword } from '../utils/crypto';
import usePasswordStore from '../store/passwordStore';
import Button from '../components/Button';
import Input from '../components/Input';

// Login page component
const Login = () => {
  const navigate = useNavigate();
  const setAuthenticated = usePasswordStore(state => state.setAuthenticated);
  
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [error, setError] = useState('');
  
  // Security questions state
  const [showSecuritySetup, setShowSecuritySetup] = useState(false);
  const [showRecovery, setShowRecovery] = useState(false);
  const [securityAnswers, setSecurityAnswers] = useState(['', '', '']);
  const [recoveryAnswers, setRecoveryAnswers] = useState(['', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  
  const isNewUser = !hasMasterPassword();
  const maxAttempts = 3;
  
  // Handle security answers setup (for new users)
  const handleSecuritySetup = () => {
    if (securityAnswers.some(ans => ans.trim() === '')) {
      setError('Please answer all security questions');
      return;
    }
    
    saveSecurityAnswers(securityAnswers);
    setAuthenticated(true);
    navigate('/dashboard');
  };
  
  // Handle password recovery
  const handleRecovery = () => {
    if (recoveryAnswers.some(ans => ans.trim() === '')) {
      setError('Please answer all security questions');
      return;
    }
    
    if (!verifySecurityAnswers(recoveryAnswers)) {
      setError('Security answers incorrect. Need at least 2 correct answers.');
      return;
    }
    
    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters');
      return;
    }
    
    if (newPassword !== confirmNewPassword) {
      setError('Passwords do not match');
      return;
    }
    
    // Reset master password
    const hashed = hashPassword(newPassword);
    saveMasterPassword(hashed);
    setError('');
    alert('Password reset successful! Please login with your new password.');
    setShowRecovery(false);
    setRecoveryAnswers(['', '', '']);
    setNewPassword('');
    setConfirmNewPassword('');
    setAttempts(0);
  };
  
  // Handle login or registration
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (isNewUser) {
      // Create new master password
      if (pass.length < 8) {
        setError('Password must be at least 8 characters long');
        return;
      }
      
      if (pass !== confirmPass) {
        setError('Passwords do not match');
        return;
      }
      
      const hashed = hashPassword(pass);
      saveMasterPassword(hashed);
      
      // Show security questions setup
      setShowSecuritySetup(true);
    } else {
      // Login with existing password
      const stored = getMasterPassword();
      const hashed = hashPassword(pass);
      
      if (hashed === stored) {
        setAuthenticated(true);
        navigate('/dashboard');
      } else {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        
        if (newAttempts >= maxAttempts) {
          setError('Maximum login attempts reached.');
        } else {
          setError(`Incorrect password. ${maxAttempts - newAttempts} attempts remaining.`);
        }
      }
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-dark-bg via-dark-card to-dark-bg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo and title */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 mb-4"
          >
            <FiLock className="text-4xl text-primary" />
          </motion.div>
          
          <h1 className="text-3xl font-bold text-dark-text mb-2">
            {showRecovery 
              ? 'Recover Password' 
              : showSecuritySetup 
                ? 'Setup Security Questions' 
                : isNewUser 
                  ? 'Create Master Password' 
                  : 'Welcome Back'}
          </h1>
          <p className="text-dark-muted">
            {showRecovery 
              ? 'Answer your security questions to reset password' 
              : showSecuritySetup 
                ? 'Set up security questions for password recovery' 
                : isNewUser 
                  ? 'Set up a strong master password to secure your vault' 
                  : 'Enter your master password to continue'}
          </p>
        </div>
        
        {/* Security Questions Setup (for new users) */}
        {showSecuritySetup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-2xl p-8"
          >
            <div className="space-y-4">
              {SECURITY_QUESTIONS.map((question, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-dark-text mb-2">
                    Question {index + 1}: {question}
                  </label>
                  <input
                    type="text"
                    value={securityAnswers[index]}
                    onChange={(e) => {
                      const newAnswers = [...securityAnswers];
                      newAnswers[index] = e.target.value;
                      setSecurityAnswers(newAnswers);
                    }}
                    placeholder="Your answer"
                    className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-3 text-dark-text placeholder:text-dark-muted focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              ))}
              
              {error && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-sm"
                >
                  {error}
                </motion.div>
              )}
              
              <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
                <p className="text-xs text-dark-muted">
                  <strong className="text-primary">Important:</strong> Remember your answers! 
                  You'll need at least 2 correct answers to recover your password.
                </p>
              </div>
              
              <Button
                onClick={handleSecuritySetup}
                variant="primary"
                fullWidth
              >
                Complete Setup
              </Button>
            </div>
          </motion.div>
        )}
        
        {/* Password Recovery */}
        {showRecovery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-2xl p-8"
          >
            <div className="space-y-4">
              <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-yellow-500 text-sm mb-4">
                Answer at least 2 questions correctly to reset your password
              </div>
              
              {SECURITY_QUESTIONS.map((question, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-dark-text mb-2">
                    {question}
                  </label>
                  <input
                    type="text"
                    value={recoveryAnswers[index]}
                    onChange={(e) => {
                      const newAnswers = [...recoveryAnswers];
                      newAnswers[index] = e.target.value;
                      setRecoveryAnswers(newAnswers);
                    }}
                    placeholder="Your answer"
                    className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-3 text-dark-text placeholder:text-dark-muted focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              ))}
              
              <Input
                label="New Master Password"
                type={showPass ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password (min 8 chars)"
                icon={FiLock}
              />
              
              <Input
                label="Confirm New Password"
                type={showPass ? 'text' : 'password'}
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                placeholder="Confirm new password"
                icon={FiLock}
              />
              
              {error && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-sm"
                >
                  {error}
                </motion.div>
              )}
              
              <div className="flex gap-4">
                <Button
                  onClick={handleRecovery}
                  variant="primary"
                  fullWidth
                >
                  Reset Password
                </Button>
                <Button
                  onClick={() => {
                    setShowRecovery(false);
                    setError('');
                    setAttempts(0);
                  }}
                  variant="secondary"
                  fullWidth
                >
                  Cancel
                </Button>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Login form */}
        {!showSecuritySetup && !showRecovery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-2xl p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="relative">
                <Input
                  label="Master Password"
                  type={showPass ? 'text' : 'password'}
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  placeholder="Enter your master password"
                  required
                  icon={FiLock}
                />
                
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-[42px] text-dark-muted hover:text-dark-text transition-colors"
                >
                  {showPass ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              
              {isNewUser && (
                <Input
                  label="Confirm Password"
                  type={showPass ? 'text' : 'password'}
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  placeholder="Confirm your master password"
                  required
                  icon={FiLock}
                />
              )}
              
              {error && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-sm"
                >
                  {error}
                </motion.div>
              )}
              
              <Button
                type="submit"
                variant="primary"
                fullWidth
                disabled={attempts >= maxAttempts}
              >
                {isNewUser ? 'Create Master Password' : 'Login'}
              </Button>
              
              {!isNewUser && attempts >= maxAttempts && hasSecurityQuestions() && (
                <Button
                  type="button"
                  onClick={() => setShowRecovery(true)}
                  variant="secondary"
                  fullWidth
                >
                  <FiHelpCircle /> Forgot Password? Recover Now
                </Button>
              )}
            </form>
            
            {isNewUser && (
              <div className="mt-4 p-4 bg-primary/10 border border-primary/30 rounded-lg">
                <p className="text-xs text-dark-muted">
                  <strong className="text-primary">Important:</strong> Remember this password! 
                  You'll also set up security questions for recovery.
                </p>
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Login;
