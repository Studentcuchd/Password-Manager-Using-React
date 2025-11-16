import { motion } from 'framer-motion';
import { FiDownload, FiTrash2, FiAlertCircle } from 'react-icons/fi';
import { useState } from 'react';
import usePasswordStore from '../store/passwordStore';
import { exportPasswords, downloadTextFile } from '../utils/storage';
import { decrypt } from '../utils/crypto';
import Button from '../components/Button';
import Modal from '../components/Modal';

// Settings page component
const Settings = () => {
  const passList = usePasswordStore(state => state.passList);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);
  
  // Handle export passwords
  const handleExport = () => {
    if (passList.length === 0) {
      alert('No passwords to export');
      return;
    }
    
    const exportText = exportPasswords(passList, decrypt);
    downloadTextFile(exportText, 'exported_passwords.txt');
    setShowExportModal(false);
    alert('Passwords exported successfully!');
  };
  
  // Handle clear all data
  const handleClearData = () => {
    localStorage.clear();
    window.location.href = '/';
  };
  
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-dark-text mb-2">Settings</h1>
        <p className="text-dark-muted">Manage your password vault</p>
      </motion.div>
      
      {/* Export section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-xl p-6"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
            <FiDownload className="text-2xl text-primary" />
          </div>
          
          <div className="flex-1">
            <h2 className="text-xl font-bold text-dark-text mb-2">
              Export Passwords
            </h2>
            <p className="text-dark-muted mb-4">
              Download all your passwords as a text file. The exported file will contain 
              decrypted passwords, so keep it secure.
            </p>
            <Button
              variant="primary"
              onClick={() => setShowExportModal(true)}
              disabled={passList.length === 0}
            >
              <FiDownload /> Export All Passwords
            </Button>
          </div>
        </div>
      </motion.div>
      
      {/* Danger zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-xl p-6 border-l-4 border-red-500"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center flex-shrink-0">
            <FiTrash2 className="text-2xl text-red-500" />
          </div>
          
          <div className="flex-1">
            <h2 className="text-xl font-bold text-dark-text mb-2 flex items-center gap-2">
              Danger Zone
            </h2>
            <p className="text-dark-muted mb-4">
              Clear all data including master password and all saved passwords. 
              This action cannot be undone.
            </p>
            <Button
              variant="danger"
              onClick={() => setShowClearModal(true)}
            >
              <FiTrash2 /> Clear All Data
            </Button>
          </div>
        </div>
      </motion.div>
      
      {/* App info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass rounded-xl p-6"
      >
        <h2 className="text-xl font-bold text-dark-text mb-4">About</h2>
        <div className="space-y-2 text-sm text-dark-muted">
          <p><strong className="text-dark-text">Version:</strong> 1.0.0</p>
          <p><strong className="text-dark-text">Total Passwords:</strong> {passList.length}</p>
          <p><strong className="text-dark-text">Storage:</strong> Browser LocalStorage</p>
          <p><strong className="text-dark-text">Encryption:</strong> XOR Encryption</p>
        </div>
      </motion.div>
      
      {/* Export confirmation modal */}
      <Modal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Export Passwords"
      >
        <div className="mb-6">
          <div className="flex items-center gap-3 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg mb-4">
            <FiAlertCircle className="text-yellow-500 text-2xl flex-shrink-0" />
            <p className="text-sm text-dark-muted">
              The exported file will contain <strong>unencrypted passwords</strong>. 
              Keep it in a secure location.
            </p>
          </div>
          
          <p className="text-dark-muted">
            Export {passList.length} password{passList.length !== 1 ? 's' : ''} to a text file?
          </p>
        </div>
        
        <div className="flex gap-4">
          <Button variant="primary" fullWidth onClick={handleExport}>
            Export
          </Button>
          <Button
            variant="secondary"
            fullWidth
            onClick={() => setShowExportModal(false)}
          >
            Cancel
          </Button>
        </div>
      </Modal>
      
      {/* Clear data confirmation modal */}
      <Modal
        isOpen={showClearModal}
        onClose={() => setShowClearModal(false)}
        title="Clear All Data"
      >
        <div className="mb-6">
          <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg mb-4">
            <FiAlertCircle className="text-red-500 text-2xl flex-shrink-0" />
            <p className="text-sm text-dark-muted">
              <strong>Warning:</strong> This will permanently delete all your data.
              This action cannot be undone!
            </p>
          </div>
          
          <p className="text-dark-muted">
            Are you sure you want to clear all data? You will lose:
          </p>
          <ul className="mt-2 text-sm text-dark-muted list-disc list-inside">
            <li>Master password</li>
            <li>All {passList.length} saved passwords</li>
            <li>All settings</li>
          </ul>
        </div>
        
        <div className="flex gap-4">
          <Button variant="danger" fullWidth onClick={handleClearData}>
            Yes, Clear Everything
          </Button>
          <Button
            variant="secondary"
            fullWidth
            onClick={() => setShowClearModal(false)}
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Settings;
