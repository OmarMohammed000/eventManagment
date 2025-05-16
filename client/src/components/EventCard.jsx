import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Button,
  CardActions,
  Alert,
  Snackbar,
} from "@mui/material";
import { AccessTime, LocationOn } from "@mui/icons-material";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

import BookingButton from './BookingButton';

export default function EventCard({ event, isBooked = false }) {
  const navigate = useNavigate();
  
  const [showSuccess, setShowSuccess] = useState(false);
 
  // Format dates for display
  const startDate = new Date(event.start_date);
  const endDate = new Date(event.end_date);
  const handleLernMore = () => {
    navigate(`/events/${event.id}`);
  };
  // Calculate duration in days
  const durationInDays = Math.ceil(
    (endDate - startDate) / (1000 * 60 * 60 * 24)
  );

  return (
    <>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          transition: "transform 0.2s",
          "&:hover": {
            transform: "scale(1.02)",
          },
          
        }}
      >
        <CardMedia
          component="img"
          sx={{
            height: {
              xs: 200, // Mobile: smaller height
              sm: 250, // Tablet: medium height
              md: 300, // Desktop: full height
            },
            objectFit: "cover", // Ensures image covers area without distortion
          }}
          image={event.image || "https://source.unsplash.com/random?concert"}
          alt={event.event_name}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="div" noWrap>
            {event.event_name}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <LocationOn sx={{ fontSize: 20, mr: 1, color: "text.secondary" }} />
            <Typography variant="body2" color="text.secondary" noWrap>
              {event.venu}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <AccessTime sx={{ fontSize: 20, mr: 1, color: "text.secondary" }} />
            <Typography variant="body2" color="text.secondary">
              {format(startDate, "MMM dd, yyyy")}
              {durationInDays > 1 && ` - ${format(endDate, "MMM dd, yyyy")}`}
            </Typography>
          </Box>

          {durationInDays > 1 && (
            <Chip
              label={`${durationInDays} day event`}
              size="small"
              sx={{ mt: 1 }}
              color="primary"
            />
          )}
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" onClick={handleLernMore}>
            Learn More
          </Button>
          <BookingButton 
            eventId={event.id}
            isBooked={isBooked}
            onBookingSuccess={() => window.location.reload()}
          />
        </CardActions>
      </Card>

      <Snackbar
        open={showSuccess}
        autoHideDuration={1500}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Event booked successfully!
        </Alert>
      </Snackbar>
    </>
  );
}
