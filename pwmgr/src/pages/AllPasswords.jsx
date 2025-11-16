import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAlertCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import usePasswordStore from '../store/passwordStore';
import PasswordCard from '../components/PasswordCard';
import SearchBar from '../components/SearchBar';
import Modal from '../components/Modal';
import Button from '../components/Button';

// All passwords page component
const AllPasswords = () => {
  const navigate = useNavigate();
  const passList = usePasswordStore(state => state.passList);
  const loadPasswords = usePasswordStore(state => state.loadPasswords);
  const deletePass = usePasswordStore(state => state.deletePass);
  const getFilteredPasswords = usePasswordStore(state => state.getFilteredPasswords);
  const getSortedPasswords = usePasswordStore(state => state.getSortedPasswords);
  const selectPass = usePasswordStore(state => state.selectPass);
  
  const [deleteModal, setDeleteModal] = useState(false);
  const [passToDelete, setPassToDelete] = useState(null);
  
  useEffect(() => {
    loadPasswords();
  }, []);
  
  // Get filtered and sorted passwords
  const filteredPasswords = getSortedPasswords();
  
  // Handle edit
  const handleEdit = (pass) => {
    selectPass(pass);
    navigate('/edit');
  };
  
  // Handle delete confirmation
  const handleDeleteClick = (id) => {
    const pass = passList.find(p => p.id === id);
    setPassToDelete(pass);
    setDeleteModal(true);
  };
  
  // Confirm delete
  const confirmDelete = () => {
    if (passToDelete) {
      deletePass(passToDelete.id);
      setDeleteModal(false);
      setPassToDelete(null);
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-dark-text mb-2">All Passwords</h1>
        <p className="text-dark-muted">
          {passList.length} password{passList.length !== 1 ? 's' : ''} stored
        </p>
      </motion.div>
      
      {/* Search bar */}
      <SearchBar />
      
      {/* Password grid */}
      {filteredPasswords.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredPasswords.map((pass) => (
              <PasswordCard
                key={pass.id}
                pass={pass}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-xl p-12 text-center"
        >
          <FiAlertCircle className="text-6xl text-dark-muted mx-auto mb-4" />
          <h3 className="text-xl font-bold text-dark-text mb-2">
            No Passwords Found
          </h3>
          <p className="text-dark-muted">
            {passList.length === 0
              ? "You haven't added any passwords yet"
              : 'Try a different search term'}
          </p>
        </motion.div>
      )}
      
      {/* Delete confirmation modal */}
      <Modal
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        title="Delete Password"
      >
        <p className="text-dark-muted mb-6">
          Are you sure you want to delete the password for{' '}
          <strong className="text-dark-text">{passToDelete?.title}</strong>?
          This action cannot be undone.
        </p>
        
        <div className="flex gap-4">
          <Button variant="danger" fullWidth onClick={confirmDelete}>
            Delete
          </Button>
          <Button
            variant="secondary"
            fullWidth
            onClick={() => setDeleteModal(false)}
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default AllPasswords;
