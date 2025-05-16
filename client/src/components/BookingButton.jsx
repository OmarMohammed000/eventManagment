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

export default function BookingButton({ eventId, isBooked = false }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const handleBookEvent = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      await axios.post(
        `${apiLink}/events/${eventId}/users/${user.id}`,
        {},
        { withCredentials: true }
      );
      setShowDialog(true);
    } catch (error) {
      console.error("Failed to book event:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDialogClose = (viewEvents = false) => {
    setShowDialog(false);
    if (viewEvents) {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById('your-events');
        element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  if (!user) return null;

  return (
    <>
      {isBooked ? (
        <Chip 
          label="Already Booked" 
          color="success" 
          variant="outlined" 
        />
      ) : (
        <Button
          size="small"
          color="primary"
          onClick={handleBookEvent}
          disabled={loading}
          variant="contained"
        >
          {loading ? "Booking..." : "Book Now"}
        </Button>
      )}

      <Dialog
        open={showDialog}
        onClose={() => handleDialogClose(false)}
      >
        <DialogTitle>
          Booking Successful!
        </DialogTitle>
        <DialogContent>
          <Typography>
            Your event has been successfully booked. Would you like to view your booked events?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDialogClose(false)} color="primary">
            Stay Here
          </Button>
          <Button onClick={() => handleDialogClose(true)} color="primary" variant="contained">
            View My Events
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}