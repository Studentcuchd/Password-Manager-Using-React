import { motion } from 'framer-motion';

// Modal component for confirmations and forms
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-dark-card border border-dark-border rounded-2xl p-6 max-w-md w-full"
      >
        {title && (
          <h2 className="text-xl font-bold text-dark-text mb-4">{title}</h2>
        )}
        {children}
      </motion.div>
    </motion.div>
  );
};

export default Modal;
