import React, { useState, useEffect } from "react";
import { Container, Typography, Alert, Box, Grid } from "@mui/material";
import UserEventCard from "./UserEventCard";
import apiLink from "../../data/ApiLink";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

export default function UserEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserEvents = async () => {
      try {
        const response = await axios.get(
          `${apiLink}/events/user/${user.id}`,
          { withCredentials: true }
        );
        setEvents(response.data);
      } catch (err) {
        if (err.response?.status === 404) {
          setEvents([]);
        } else {
          setError("Error fetching your events: " + err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUserEvents();
    }
  }, [user]);

  const handleUnbookEvent = async (eventId) => {
    try {
      await axios.delete(`${apiLink}/events/${eventId}/users/${user.id}`, {
        withCredentials: true
      });
      setEvents(events.filter(event => event.id !== eventId));
    } catch (err) {
      setError("Failed to unbook event: " + err.message);
    }
  };

  if (loading) return <Box sx={{ p: 3 }}><Typography>Loading your events...</Typography></Box>;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container sx={{ my: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Your Booked Events
      </Typography>
      
      {events.length === 0 ? (
        <Alert severity="info">You haven't booked any events yet.</Alert>
      ) : (
        <Grid container spacing={3}>
          {events.map((event) => (
            <Grid item xs={12} key={event.id}>
              <UserEventCard
                event={event}
                onUnbook={() => handleUnbookEvent(event.id)}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}