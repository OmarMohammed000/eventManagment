import React from "react";
import {
  AppBar,
  Box,
  Button,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import SearchBar from "./SearchBar";
import ColorModeToggle from './ColorModeToggle';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function NavBar() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AppBar position="fixed">
      <Toolbar 
        disableGutters  
        sx={{
          paddingRight: 2,
          paddingLeft: 2,
        }} 
      >
        {/* Left section - Brand and conditional Your Events */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{ 
              cursor: 'pointer',
              textDecoration: 'none', 
              color: 'inherit' 
            }}
          >
            EMS
          </Typography>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/?section=events"
            onClick={() => {
              const element = document.getElementById('events');
              element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
          >
            Events
          </Button>
          {user && (
            <Button 
              color="inherit"
              component={RouterLink}
              to="/?section=your-events"
              onClick={() => {
                const element = document.getElementById('your-events');
                element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              Your Events
            </Button>
          )}
        </Box>

        {/* Center section - Search Bar */}
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'center',
            px: 4
          }}
        >
          <SearchBar />
        </Box>

        {/* Right section - Auth buttons, Admin Dashboard, and Theme Toggle */}
        <Stack 
          direction="row" 
          spacing={2} 
          alignItems="center" 
          justifyContent="flex-end"
        >
          {user ? (
            <>
              {user.isAdmin && (
                <Button 
                  color="inherit" 
                  component={RouterLink} 
                  to="/admin"
                >
                  Admin Dashboard
                </Button>
              )}
              <Button 
                color="inherit"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button 
                color="inherit" 
                component={RouterLink} 
                to="/login"
              >
                Login
              </Button>
              <Button 
                color="inherit" 
                component={RouterLink} 
                to="/register"
              >
                Register
              </Button>
            </>
          )}
          <ColorModeToggle />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
