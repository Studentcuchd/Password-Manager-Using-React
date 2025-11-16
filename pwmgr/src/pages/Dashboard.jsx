import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiLock, FiAlertCircle, FiCheckCircle, FiClock } from 'react-icons/fi';
import usePasswordStore from '../store/passwordStore';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

// Dashboard page component
const Dashboard = () => {
  const passList = usePasswordStore(state => state.passList);
  const loadPasswords = usePasswordStore(state => state.loadPasswords);
  
  useEffect(() => {
    loadPasswords();
  }, []);
  
  // Calculate statistics
  const totalPasswords = passList.length;
  const expiredCount = passList.filter(p => p.status === 'Expired').length;
  const expiringSoonCount = passList.filter(p => p.status === 'Expiring Soon').length;
  const weakPasswords = passList.filter(p => p.level < 4).length;
  
  // Stats cards data
  const stats = [
    {
      title: 'Total Passwords',
      value: totalPasswords,
      icon: FiLock,
      color: '#6366f1',
      bgColor: 'rgba(99, 102, 241, 0.1)',
    },
    {
      title: 'Weak Passwords',
      value: weakPasswords,
      icon: FiAlertCircle,
      color: '#f59e0b',
      bgColor: 'rgba(245, 158, 11, 0.1)',
    },
    {
      title: 'Expiring Soon',
      value: expiringSoonCount,
      icon: FiClock,
      color: '#f59e0b',
      bgColor: 'rgba(245, 158, 11, 0.1)',
    },
    {
      title: 'Expired',
      value: expiredCount,
      icon: FiAlertCircle,
      color: '#ef4444',
      bgColor: 'rgba(239, 68, 68, 0.1)',
    },
  ];
  
  return (
    <div className="space-y-6">
      {/* Welcome header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-dark-text mb-2">Dashboard</h1>
        <p className="text-dark-muted">Overview of your password vault</p>
      </motion.div>
      
      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-xl p-6 card-hover"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: stat.bgColor }}
                >
                  <Icon className="text-2xl" style={{ color: stat.color }} />
                </div>
              </div>
              
              <h3 className="text-3xl font-bold text-dark-text mb-1">{stat.value}</h3>
              <p className="text-sm text-dark-muted">{stat.title}</p>
            </motion.div>
          );
        })}
      </div>
      
      {/* Quick actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass rounded-xl p-6"
      >
        <h2 className="text-xl font-bold text-dark-text mb-4">Quick Actions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/add">
            <Button variant="primary" fullWidth>
              <FiLock /> Add New Password
            </Button>
          </Link>
          
          <Link to="/passwords">
            <Button variant="secondary" fullWidth>
              View All Passwords
            </Button>
          </Link>
          
          <Link to="/settings">
            <Button variant="secondary" fullWidth>
              Export Passwords
            </Button>
          </Link>
        </div>
      </motion.div>
      
      {/* Security tips */}
      {(weakPasswords > 0 || expiredCount > 0) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass rounded-xl p-6 border-l-4 border-yellow-500"
        >
          <h2 className="text-xl font-bold text-dark-text mb-3 flex items-center gap-2">
            <FiAlertCircle className="text-yellow-500" />
            Security Recommendations
          </h2>
          
          <ul className="space-y-2 text-dark-muted">
            {weakPasswords > 0 && (
              <li>• You have {weakPasswords} weak password{weakPasswords > 1 ? 's' : ''}. Consider updating them.</li>
            )}
            {expiredCount > 0 && (
              <li>• {expiredCount} password{expiredCount > 1 ? 's have' : ' has'} expired. Update them soon.</li>
            )}
            {expiringSoonCount > 0 && (
              <li>• {expiringSoonCount} password{expiringSoonCount > 1 ? 's are' : ' is'} expiring soon.</li>
            )}
          </ul>
        </motion.div>
      )}
      
      {totalPasswords === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-xl p-12 text-center"
        >
          <FiLock className="text-6xl text-dark-muted mx-auto mb-4" />
          <h3 className="text-xl font-bold text-dark-text mb-2">No Passwords Yet</h3>
          <p className="text-dark-muted mb-6">Get started by adding your first password</p>
          <Link to="/add">
            <Button variant="primary">
              Add Your First Password
            </Button>
          </Link>
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard;
