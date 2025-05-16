import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  Link,
  CircularProgress
} from '@mui/material';

export default function AuthForm({ isRegister = false }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, register, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await register(email, password);
        // After successful registration, redirect to login
        navigate('/login', { 
          state: { message: 'Registration successful! Please login.' }
        });
      } else {
        await login(email, password);
        // After successful login, redirect to home
        navigate('/');
      }
    } catch (err) {
      // Error is handled by auth context
      console.error('Auth error:', err);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
        <Typography component="h1" variant="h5" align="center" gutterBottom>
          {isRegister ? 'Register' : 'Sign In'}
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete={isRegister ? 'new-password' : 'current-password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              isRegister ? 'Register' : 'Sign In'
            )}
          </Button>
          
          <Box sx={{ textAlign: 'center' }}>
            <Link
              component={RouterLink}
              to={isRegister ? '/login' : '/register'}
              variant="body2"
            >
              {isRegister
                ? 'Already have an account? Sign in'
                : "Don't have an account? Sign up"}
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}