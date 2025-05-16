import React, { useState } from 'react';
import { 
  Button, 
  Chip, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  Typography 
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import apiLink from '../data/ApiLink';

export default function BookingButton({ eventId, isBooked = false, onBookingSuccess }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleBookEvent = async () => {
    try {
      setLoading(true);
      await axios.post(
        `${apiLink}/events/${eventId}/users/${user.id}`,
        {},
        { withCredentials: true }
      );
      setShowSuccess(true);
      if (onBookingSuccess) {
        onBookingSuccess();
      }
    } catch (error) {
      console.error("Failed to book event:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDialogClose = () => {
    setShowSuccess(false);
    // First navigate to home page
    navigate('/', { replace: true });
    // Then scroll to your-events section after navigation is complete
    setTimeout(() => {
      const element = document.getElementById('your-events');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <>
      {isBooked ? (
        <Chip 
          label="Already Booked" 
          color="success" 
          variant="outlined" 
        />
      ) : (
        user && (
          <Button
            size="small"
            color="primary"
            onClick={handleBookEvent}
            disabled={loading}
            variant="contained"
          >
            {loading ? "Booking..." : "Book Now"}
          </Button>
        )
      )}

      <Dialog
        open={showSuccess}
        onClose={handleDialogClose}
        aria-labelledby="booking-success-dialog"
      >
        <DialogTitle id="booking-success-dialog">
          Booking Successful!
        </DialogTitle>
        <DialogContent>
          <Typography>
            Your event has been successfully booked. Would you like to view your booked events?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            View My Events
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}