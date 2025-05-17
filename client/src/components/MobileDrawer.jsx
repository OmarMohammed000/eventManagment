import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Event as EventIcon,
  BookmarkBorder as BookmarkIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  AdminPanelSettings as AdminIcon,
  PersonAdd as RegisterIcon,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { scrollToSection } from '../utils/scrollToSection';

export default function MobileDrawer() {
  const [open, setOpen] = React.useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleNavigation = (path, section = null) => {
    setOpen(false);
    if (section) {
      navigate(path);
      scrollToSection(section);
    } else {
      navigate(path);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <>
      <IconButton
        color="inherit"
        edge="start"
        onClick={() => setOpen(true)}
        sx={{ display: { sm: 'none' } }}
      >
        <MenuIcon />
      </IconButton>
      
      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
      >
        <List sx={{ width: 250 }}>
          <ListItem onClick={() => handleNavigation('/', 'events')}>
            <ListItemIcon>
              <EventIcon />
            </ListItemIcon>
            <ListItemText primary="Events" />
          </ListItem>

          {user && (
            <ListItem onClick={() => handleNavigation('/', 'your-events')}>
              <ListItemIcon>
                <BookmarkIcon />
              </ListItemIcon>
              <ListItemText primary="Your Events" />
            </ListItem>
          )}

          <Divider sx={{ my: 1 }} />

          {user ? (
            <>
              {user.isAdmin && (
                <ListItem onClick={() => handleNavigation('/admin')}>
                  <ListItemIcon>
                    <AdminIcon />
                  </ListItemIcon>
                  <ListItemText primary="Admin Dashboard" />
                </ListItem>
              )}
              <ListItem onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </>
          ) : (
            <>
              <ListItem onClick={() => handleNavigation('/login')}>
                <ListItemIcon>
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText primary="Login" />
              </ListItem>
              <ListItem onClick={() => handleNavigation('/register')}>
                <ListItemIcon>
                  <RegisterIcon />
                </ListItemIcon>
                <ListItemText primary="Register" />
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </>
  );
}