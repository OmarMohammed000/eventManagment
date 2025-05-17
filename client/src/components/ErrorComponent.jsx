import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Paper 
} from '@mui/material';
import { 
  Home as HomeIcon,
  Error as ErrorIcon 
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function ErrorComponent({ 
  title = "Oops! Something went wrong", 
  message = "We encountered an error while processing your request.",
  error
}) {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          mt: 8, 
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2
        }}
      >
        <ErrorIcon color="error" sx={{ fontSize: 60 }} />
        
        <Typography variant="h5" component="h1" gutterBottom>
          {title}
        </Typography>

        <Typography variant="body1" color="text.secondary" paragraph>
          {message}
        </Typography>

        {error && (
          <Typography 
            variant="body2" 
            color="error" 
            sx={{ 
              mb: 2,
              p: 2,
              bgcolor: 'error.light',
              color: 'error.contrastText',
              borderRadius: 1,
              width: '100%'
            }}
          >
            {error}
          </Typography>
        )}

        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            startIcon={<HomeIcon />}
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}