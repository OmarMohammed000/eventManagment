import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Skeleton,
  Alert,
  Paper,
  Chip,
  Grid,
  Divider,
} from "@mui/material";
import { LocationOn, AccessTime, Tag } from "@mui/icons-material";
import { format } from "date-fns";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useParams } from "react-router-dom";
import apiLink from "../data/ApiLink";
import BookingButton from './BookingButton';
import { checkEventBookingStatus } from '../utils/checkEventBookingStatus';
import { useAuth } from "../context/AuthContext";

export default function EventPage() {
  const { id } = useParams();
  const [event, setEvent] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [isBooked, setIsBooked] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${apiLink}/events/${id}`
        );
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        setError("Error fetching event: " + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  useEffect(() => {
    const checkBookingStatus = async () => {
      if (user && event) {
        const status = await checkEventBookingStatus(event.id, user.id);
        setIsBooked(status);
      }
    };
    
    checkBookingStatus();
  }, [user, event]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box sx={{ width: "100%", mb: 4 }}>
          <Skeleton variant="rectangular" height={400} sx={{ mb: 2 }} />
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Skeleton variant="text" height={60} sx={{ mb: 2 }} />
            <Skeleton variant="text" height={30} sx={{ mb: 1 }} />
            <Skeleton variant="text" height={30} sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" height={200} />
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Skeleton variant="text" height={30} sx={{ mb: 1 }} />
              <Skeleton variant="text" height={24} sx={{ mb: 1 }} />
              <Skeleton variant="text" height={24} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 10 }}>
        <Alert severity="error" sx={{ mb: 10,mt:10 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  if (!event) return null;

  const startDate = new Date(event.start_date);
  const endDate = new Date(event.end_date);
  const durationInDays = Math.ceil(
    (endDate - startDate) / (1000 * 60 * 60 * 24)
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* Image Carousel */}
      <Box sx={{ mb: 4 }}>
        <div
          id="eventImageCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {event.event_images.map((image, index) => (
              <div
                key={index}  // Changed from image.id since it's not in the response
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <img
                  src={image.image_location}
                  className="d-block w-100"
                  alt={`Event image ${index + 1}`}
                  style={{
                    height: "400px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#eventImageCarousel"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"  
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#eventImageCarousel"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </Box>

      <Grid container spacing={3}>
        {/* Main Content */}
        <Grid item xs={12} md={8}>
          <Typography variant="h3" component="h1" gutterBottom>
            {event.event_name}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <LocationOn color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6">{event.venu}</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <AccessTime color="primary" sx={{ mr: 1 }} />
            <Typography>
              {format(startDate, "MMMM dd, yyyy 'at' h:mm a")}
              {durationInDays > 1 &&
                ` - ${format(endDate, "MMMM dd, yyyy 'at' h:mm a")}`}
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Typography variant="h5" gutterBottom>
            About this event
          </Typography>
          <Typography variant="body1" paragraph>
            {event.description}
          </Typography>

          {/* Tags */}
          {event.tags && event.tags.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Categories
              </Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {event.tags.map((tag, index) => (
                  <Chip
                    key={index}  
                    icon={<Tag />}
                    label={tag.name}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
            </Box>
          )}
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, position: "sticky", top: 20  }}>
            {durationInDays > 1 && (
              <Chip
                label={`${durationInDays} day event`}
                color="primary"
                sx={{ mb: 2 }}
              />
            )}
            <Typography variant="h6" gutterBottom>
              Event Details
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Start Date
              </Typography>
              <Typography>
                {format(startDate, "MMMM dd, yyyy 'at' h:mm a")}
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                End Date
              </Typography>
              <Typography>
                {format(endDate, "MMMM dd, yyyy 'at' h:mm a")}
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Location
              </Typography>
              <Typography>{event.venu}</Typography>
            </Box>
            <Box sx={{ mt: 3 }}>
              <BookingButton 
                eventId={event.id}
                isBooked={isBooked}
                onBookingSuccess={() => {
                  setIsBooked(true);
                }}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
