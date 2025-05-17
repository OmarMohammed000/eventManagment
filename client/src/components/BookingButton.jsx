import React, { useState } from 'react';
import { 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  Typography,
  Alert,
  CircularProgress 
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import apiLink from '../data/ApiLink';

export default function BookingButton({ eventId, isBooked = false, onBookingSuccess }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  const handleBookEvent = async () => {
    if (!user) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }

    // If already booked, show dialog
    if (isBooked) {
      setShowDialog(true);
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.post(
        `${apiLink}/events/${eventId}/users/${user.id}`,
        {},
        { withCredentials: true }
      );

      if (response.data.status === 'success') {
        setShowDialog(true);
        if (onBookingSuccess) {
          onBookingSuccess();
        }
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to book event";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDialogClose = (viewEvents = false) => {
    setShowDialog(false);
    setError(null);
    if (viewEvents) {
      navigate('/?section=your-events');
      setTimeout(() => {
        const element = document.getElementById('your-events');
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  if (!user) {
    return (
      <Button
        variant="contained"
        color="primary"
        sx={{ 
          minWidth: '120px',
          height: '36px'
        }}
        onClick={() => navigate('/login', { state: { from: location.pathname } })}
      >
        Login to Book
      </Button>
    );
  }

  return (
    <>
      <Button
        variant="contained"
        color={isBooked ? "success" : "primary"}
        sx={{ 
          minWidth: '120px',
          height: '36px'
        }}
        onClick={handleBookEvent}
        disabled={loading}
      >
        {loading ? (
          <CircularProgress size={20} color="inherit" />
        ) : isBooked ? (
          "Booked ✓"
        ) : (
          "Book Event"
        )}
      </Button>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      <Dialog open={showDialog} onClose={() => handleDialogClose(false)}>
        <DialogTitle>
          {isBooked ? "Already Booked" : "Booking Successful!"}
        </DialogTitle>
        <DialogContent>
          <Typography>
            {isBooked 
              ? "You have already booked this event. Would you like to view your booked events?"
              : "You have successfully booked this event."
            }
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDialogClose(false)}>
            Close
          </Button>
          <Button 
            variant="contained" 
            onClick={() => handleDialogClose(true)}
          >
            View Your Events
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}