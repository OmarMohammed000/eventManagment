import React, { useState, useEffect, useCallback } from "react";
import EventCard from "../../components/EventCard";
import TagFilter from "./TagFilter";
import apiLink from "../../data/ApiLink";
import { Alert, Box, Container, Grid, Skeleton } from "@mui/material";
import axios from "axios";
import { checkEventBookingStatus } from '../../utils/checkEventBookingStatus';
import { useAuth } from "../../context/AuthContext";

export default function Events() {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookedStatuses, setBookedStatuses] = useState({});

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      const apiCall = selectedTag 
        ? `${apiLink}/events/tag/${selectedTag}`
        : `${apiLink}/events`;
      const response = await axios.get(apiCall);
      setEvents(response.data);

      if (user) {
        const statuses = {};
        await Promise.all(
          response.data.map(async (event) => {
            const isBooked = await checkEventBookingStatus(event.id, user.id);
            statuses[event.id] = isBooked;
          })
        );
        setBookedStatuses(statuses);
      }
    } catch (error) {
      setError("Error Fetching events: " + error);
    } finally {
      setLoading(false);
    }
  }, [selectedTag, user]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get(`${apiLink}/tags`);
        setTags(response.data);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };
    fetchTags();
  }, []);

  const handleTagSelect = (tagId) => {
    setSelectedTag(tagId);
  };

  if (loading) {
    return <EventsLoadingSkeleton />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Container maxWidth="xl">
      <TagFilter 
        tags={tags}
        selectedTag={selectedTag}
        onTagSelect={handleTagSelect}
      />
      <Grid 
        container 
        spacing={3} 
        padding={2}
        direction="column"
        alignItems="stretch"
      >
        {events.map((event) => (
          <Grid item xs={12} key={event.id}>
            <EventCard
              event={{
                ...event,
                image: event.event_images?.[0]?.image_location,
              }}
              sx={{ width: '100%', maxWidth: '100%' }}
              isBooked={bookedStatuses[event.id] || false}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

const EventsLoadingSkeleton = () => (
  <Container maxWidth="xl">
    <Grid container spacing={3} padding={2}>
      {[1, 2, 3].map((item) => (
        <Grid item xs={12} key={item}>
          <Box sx={{ width:"20rem" }}>
            <Skeleton variant="rectangular" sx={{ height: 300, mb: 2 }} />
            <Skeleton variant="text" sx={{ height: 40, width: '60%', mb: 1 }} />
            <Skeleton variant="text" sx={{ height: 24, width: '40%', mb: 1 }} />
            <Skeleton variant="text" sx={{ height: 24, width: '30%' }} />
          </Box>
        </Grid>
      ))}
    </Grid>
  </Container>
);