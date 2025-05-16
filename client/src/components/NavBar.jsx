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

export default function NavBar() {
  // This will come from useAuth later
  const isLoggedIn = true;

  return (
    <AppBar position="fixed">
      
        <Toolbar disableGutters  sx={{
            paddingRight: 2,
            paddingLeft: 2,
          }} >
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
            <Button color="inherit">Events</Button>
            {isLoggedIn && <Button color="inherit">Your Events</Button>}
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
           <SearchBar></SearchBar>
          </Box>

          {/* Right section - Auth buttons and Theme Toggle */}
          <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-end">
            {isLoggedIn ? (
              <Button color="inherit">Logout</Button>
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
