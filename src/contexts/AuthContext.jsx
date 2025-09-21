import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../api/api';

// Create Auth Context
const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state from localStorage on app load
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = localStorage.getItem('authToken');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
          
          // For demo purposes, skip token verification
          // In production, you would verify the token with the backend
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        setError('Failed to initialize authentication');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Demo users for testing
  const demoUsers = {
    admin: {
      id: 'demo-admin-001',
      name: 'Dr. Admin Demo',
      email: 'admin@demo.com',
      role: 'admin',
      abhaId: 'ABHA-ADMIN-001',
      phone: '+91-99999-99999',
      specialty: 'System Administrator',
      permissions: ['all'],
      lastLogin: new Date().toISOString()
    },
    doctor: {
      id: 'demo-doctor-001',
      name: 'Dr. Priya Sharma',
      email: 'doctor@demo.com',
      role: 'doctor',
      abhaId: 'ABHA-DOC-001',
      phone: '+91-98765-43210',
      specialty: 'Cardiology',
      licenseNumber: 'MH-12345',
      experience: '8 years',
      lastLogin: new Date().toISOString()
    },
    user: {
      id: 'demo-user-001',
      name: 'Rajesh Kumar',
      email: 'user@demo.com',
      role: 'user',
      abhaId: 'ABHA-USER-001',
      phone: '+91-98765-43211',
      dateOfBirth: '1979-05-15',
      gender: 'Male',
      lastLogin: new Date().toISOString()
    }
  };

  // Login function for custom email/password authentication
  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      
      // Check for demo users first
      const demoUser = Object.values(demoUsers).find(user => 
        user.email === credentials.email && credentials.password === 'demo123'
      );
      
      if (demoUser) {
        // Demo user login
        const authToken = `demo-token-${demoUser.id}`;
        setToken(authToken);
        setUser(demoUser);
        localStorage.setItem('authToken', authToken);
        localStorage.setItem('user', JSON.stringify(demoUser));
        
        return { success: true, user: demoUser };
      }
      
      // Regular API login
      const response = await authAPI.login(credentials);
      const { token: authToken, user: userData } = response.data;
      
      // Store token and user data
      setToken(authToken);
      setUser(userData);
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('user', JSON.stringify(userData));
      
      return { success: true, user: userData };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // ABHA login function - redirects to backend OAuth flow
  const abhaLogin = () => {
    try {
      setError(null);
      // This will redirect to the backend ABHA OAuth endpoint
      authAPI.abhaLogin();
    } catch (error) {
      setError('ABHA login failed');
    }
  };

  // Signup function for new user registration
  const signup = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await authAPI.signup(userData);
      return { success: true, message: response.data.message };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Signup failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    setError(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  };

  // Update user profile
  const updateProfile = async (profileData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await authAPI.updateProfile(profileData);
      const updatedUser = response.data;
      
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      return { success: true, user: updatedUser };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Profile update failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Link ABHA ID to user account
  const linkAbha = async (abhaData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await authAPI.linkAbha(abhaData);
      const updatedUser = response.data;
      
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      return { success: true, user: updatedUser };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'ABHA linking failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Clear error function
  const clearError = () => {
    setError(null);
  };

  // Get user role
  const getRole = () => {
    return user?.role || null;
  };

  // Check if user has specific role
  const hasRole = (role) => {
    return user?.role === role;
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!token && !!user;
  };

  // Demo login function for quick testing
  const demoLogin = (role) => {
    const demoUser = demoUsers[role];
    if (demoUser) {
      const authToken = `demo-token-${demoUser.id}`;
      setToken(authToken);
      setUser(demoUser);
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('user', JSON.stringify(demoUser));
      return { success: true, user: demoUser };
    }
    return { success: false, error: 'Demo user not found' };
  };

  // Context value
  const value = {
    // State
    user,
    token,
    loading,
    error,
    
    // Actions
    login,
    logout,
    signup,
    abhaLogin,
    updateProfile,
    linkAbha,
    clearError,
    demoLogin,
    
    // Utilities
    getRole,
    hasRole,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
