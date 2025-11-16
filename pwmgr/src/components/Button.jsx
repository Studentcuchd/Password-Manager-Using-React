import { motion } from 'framer-motion';

// Button component with variants
const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  type = 'button',
  fullWidth = false,
  disabled = false,
  className = ''
}) => {
  const baseStyles = 'px-6 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2';
  
  const variants = {
    primary: 'bg-primary hover:bg-primary-dark text-white',
    secondary: 'bg-dark-card hover:bg-dark-border text-dark-text border border-dark-border',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
    ghost: 'hover:bg-dark-card text-dark-text',
  };
  
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
    >
      {children}
    </motion.button>
  );
};

export default Button;
