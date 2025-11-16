import { motion } from 'framer-motion';
import { FiSearch, FiX } from 'react-icons/fi';
import usePasswordStore from '../store/passwordStore';

// Search bar component
const SearchBar = () => {
  const searchQuery = usePasswordStore(state => state.searchQuery);
  const setSearchQuery = usePasswordStore(state => state.setSearchQuery);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-muted" />
      
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by title or username..."
        className="w-full bg-dark-card border border-dark-border rounded-xl pl-12 pr-12 py-3 text-dark-text placeholder:text-dark-muted focus:outline-none focus:border-primary transition-colors"
      />
      
      {searchQuery && (
        <button
          onClick={() => setSearchQuery('')}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-muted hover:text-dark-text transition-colors"
        >
          <FiX />
        </button>
      )}
    </motion.div>
  );
};

export default SearchBar;
