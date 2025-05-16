import axios from 'axios';
import apiLink from '../data/ApiLink';

export const checkEventBookingStatus = async (eventId, userId) => {
  if (!userId) return false;
  
  try {
    const response = await axios.get(
      `${apiLink}/events/${eventId}/booking-status`,
      {
        params: { userId },
        withCredentials: true
      }
    );
    return response.data.isBooked;
  } catch (error) {
    console.error('Error checking booking status:', error);
    return false;
  }
};