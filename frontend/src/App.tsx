import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './i18n/i18n';

// Components
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import TasksPage from './pages/TasksPage';
import MapPage from './pages/MapPage';
import ProfilePage from './pages/ProfilePage';
import ChatPage from './pages/ChatPage';
import LoadingSpinner from './components/UI/LoadingSpinner';

// Context
import { AuthProvider, useAuth } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';

// Types
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userType: 'seeker' | 'helper';
}

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <AppContent />
        </div>
      </Router>
    </AuthProvider>
  );
};

const AppContent: React.FC = () => {
  const { i18n } = useTranslation();
  const { user, loading, checkAuth } = useAuth();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      // Check for existing authentication
      await checkAuth();
      
      // Set up language direction for RTL languages
      const isRTL = i18n.language === 'ar';
      document.dir = isRTL ? 'rtl' : 'ltr';
      document.documentElement.lang = i18n.language;
      
      setIsInitializing(false);
    };

    initializeApp();
  }, [checkAuth, i18n.language]);

  if (isInitializing || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <SocketProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route 
              path="/" 
              element={user ? <Navigate to="/dashboard" /> : <HomePage />} 
            />
            <Route 
              path="/login" 
              element={user ? <Navigate to="/dashboard" /> : <LoginPage />} 
            />
            <Route 
              path="/signup" 
              element={user ? <Navigate to="/dashboard" /> : <SignupPage />} 
            />
            
            {/* Protected Routes */}
            <Route 
              path="/dashboard" 
              element={user ? <Dashboard /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/tasks" 
              element={user ? <TasksPage /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/map" 
              element={user ? <MapPage /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/profile" 
              element={user ? <ProfilePage /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/chat" 
              element={user ? <ChatPage /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/chat/:taskId" 
              element={user ? <ChatPage /> : <Navigate to="/login" />} 
            />
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </SocketProvider>
  );
};

export default App;