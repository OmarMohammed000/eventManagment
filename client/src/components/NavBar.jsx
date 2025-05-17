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
import MobileDrawer from './MobileDrawer';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { scrollToSection } from '../utils/scrollToSection';

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
        {/* Mobile Drawer */}
        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
          <MobileDrawer />
        </Box>

        {/* Brand */}
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

        {/* Desktop Navigation */}
        <Box sx={{ 
          display: { xs: 'none', sm: 'flex' }, 
          alignItems: 'center', 
          gap: 2,
          ml: 2
        }}>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/?section=events"
            onClick={() => scrollToSection('events')}
          >
            Events
          </Button>
          {user && (
            <Button 
              color="inherit"
              component={RouterLink}
              to="/?section=your-events"
              onClick={() => scrollToSection('your-events')}
            >
              Your Events
            </Button>
          )}
        </Box>

        {/* Search Bar */}
        <Box
          sx={{
            flexGrow: 1,
            justifyContent: 'center',
            px: 4,
            display: { xs: 'none', md: 'flex' }
          }}
        >
          <SearchBar />
        </Box>

        {/* Right section - Auth buttons & Theme Toggle */}
        <Stack 
          direction="row" 
          spacing={2} 
          alignItems="center" 
          sx={{ display: { xs: 'none', sm: 'flex' } }}
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
