import React, { createContext, useContext, useState, useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import axios from 'axios';
import apiLink from '../data/ApiLink';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Start with loading true
  const [error, setError] = useState(null);

  // Check for existing session when the app loads
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${apiLink}/auth/me`, {
          withCredentials: true
        });
        setUser(response.data.user);
      } catch (err) {
        console.error('Auth check failed:', err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${apiLink}/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      setUser(response.data.user);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${apiLink}/auth/register`,
        { email, password },
        { withCredentials: true } // Add this to handle cookies consistently
      );
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${apiLink}/auth/logout`, {}, { withCredentials: true });
      setUser(null);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout
  };

  // Show loading state while checking authentication
  if (loading) {
    return (
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          bgcolor: (theme) => theme.palette.background.default
        }}
      >
        <CircularProgress size={40} />
        <Typography variant="h6" color="text.secondary">
          Loading EMS...
        </Typography>
      </Box>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);