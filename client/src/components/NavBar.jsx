import React from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  InputBase,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ColorModeToggle from './ColorModeToggle';

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
              component="div"
              sx={{ cursor: 'pointer' }}
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
            <Box
              sx={{
                position: 'relative',
                backgroundColor: 'action.hover',
                borderRadius: 1,
                width: '100%',
                maxWidth: 600,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <SearchIcon sx={{ ml: 2, color: 'background.default' }} />
              <InputBase 
                placeholder="Search Events..."
                sx={{
                  ml: 1,
                  flex: 1,
                  p: 1,
                  color: 'text.primary',
                  fontWeight:"light",
                  
                }}
                inputProps={{ 'aria-label': 'search events' }}
              />
            </Box>
          </Box>

          {/* Right section - Auth buttons and Theme Toggle */}
          <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-end">
            {isLoggedIn ? (
              <Button color="inherit">Logout</Button>
            ) : (
              <>
                <Button color="inherit">Login</Button>
                <Button 
                  color="inherit" 
                  variant="outlined" 
                  sx={{ borderColor: 'inherit' }}
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
