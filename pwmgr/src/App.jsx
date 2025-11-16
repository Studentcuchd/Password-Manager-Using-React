import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { hasMasterPassword } from './utils/storage';
import usePasswordStore from './store/passwordStore';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddPassword from './pages/AddPassword';
import EditPassword from './pages/EditPassword';
import AllPasswords from './pages/AllPasswords';
import Settings from './pages/Settings';

// Main App component
function App() {
  const [isAuth, setIsAuth] = useState(false);
  const isAuthenticated = usePasswordStore(state => state.isAuthenticated);
  const setAuthenticated = usePasswordStore(state => state.setAuthenticated);
  const loadPasswords = usePasswordStore(state => state.loadPasswords);
  
  useEffect(() => {
    // Check if user has master password and is authenticated
    if (hasMasterPassword() && isAuthenticated) {
      setIsAuth(true);
      loadPasswords();
    } else {
      setIsAuth(false);
    }
  }, [isAuthenticated]);
  
  // Handle logout
  const handleLogout = () => {
    setAuthenticated(false);
    setIsAuth(false);
  };
  
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-dark-bg">
        {isAuth ? (
          // Authenticated layout with navbar
          <div className="flex">
            <Navbar onLogout={handleLogout} />
            <main className="flex-1 ml-64 p-8">
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/passwords" element={<AllPasswords />} />
                  <Route path="/add" element={<AddPassword />} />
                  <Route path="/edit" element={<EditPassword />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </AnimatePresence>
            </main>
          </div>
        ) : (
          // Login page
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
