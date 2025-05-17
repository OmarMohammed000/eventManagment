import React from "react";
import { Box, Container, Typography, Link, Divider } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { scrollToSection } from '../utils/scrollToSection';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "center", sm: "flex-start" },
            mb: 2,
          }}
        >
          <Box sx={{ mb: { xs: 2, sm: 0 } }}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              EMS
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Discover. Book. Experience.
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "center", sm: "flex-start" },
            }}
          >
            <Typography variant="subtitle1" color="text.primary" gutterBottom>
              Quick Links
            </Typography>
            <Link component={RouterLink} to="/" color="text.secondary">
              Home
            </Link>
            <Link 
              component={RouterLink} 
              to="/?section=events"
              onClick={() => scrollToSection('events')}
              color="text.secondary"
            >
              Events
            </Link>
            {user && (
              <>
                <Link
                  component={RouterLink}
                  to="/?section=your-events"
                  onClick={() => scrollToSection('your-events')}
                  color="text.secondary"
                >
                  Your Events
                </Link>
                {user.isAdmin && (
                  <Link
                    component={RouterLink}
                    to="/admin"
                    color="text.secondary"
                  >
                    Admin Dashboard
                  </Link>
                )}
                <Link
                  component="button"
                  onClick={handleLogout}
                  color="text.secondary"
                  sx={{
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Logout
                </Link>
              </>
            )}
            {!user && (
              <>
                <Link component={RouterLink} to="/login" color="text.secondary">
                  Login
                </Link>
                <Link component={RouterLink} to="/register" color="text.secondary">
                  Register
                </Link>
              </>
            )}
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            © {currentYear} EMS. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
