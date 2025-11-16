import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiLock, FiPlus, FiSettings, FiLogOut } from 'react-icons/fi';
import usePasswordStore from '../store/passwordStore';

// Navigation sidebar component
const Navbar = ({ onLogout }) => {
  const location = useLocation();
  
  // Navigation items
  const navItems = [
    { path: '/dashboard', icon: FiHome, label: 'Dashboard' },
    { path: '/passwords', icon: FiLock, label: 'All Passwords' },
    { path: '/add', icon: FiPlus, label: 'Add Password' },
    { path: '/settings', icon: FiSettings, label: 'Settings' },
  ];
  
  return (
    <motion.nav
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="fixed left-0 top-0 h-screen w-64 glass border-r border-dark-border p-6 flex flex-col"
    >
      {/* Logo */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
          <FiLock className="text-3xl" />
          PassManager
        </h1>
        <p className="text-xs text-dark-muted mt-1">Secure & Modern</p>
      </div>
      
      {/* Navigation links */}
      <div className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? 'bg-primary text-white'
                  : 'text-dark-muted hover:bg-dark-card hover:text-dark-text'
              }`}
            >
              <Icon className="text-xl" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
      
      {/* Logout button */}
      <button
        onClick={onLogout}
        className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-all"
      >
        <FiLogOut className="text-xl" />
        <span className="font-medium">Logout</span>
      </button>
    </motion.nav>
  );
};

export default Navbar;
