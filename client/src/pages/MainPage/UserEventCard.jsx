import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  CardActions,
} from "@mui/material";
import { AccessTime, LocationOn } from "@mui/icons-material";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

export default function UserEventCard({ event, onUnbook }) {
  const navigate = useNavigate();
  
  const startDate = new Date(event.start_date);
  const endDate = new Date(event.end_date);
  const durationInDays = Math.ceil(
    (endDate - startDate) / (1000 * 60 * 60 * 24)
  );

  const handleLearnMore = () => {
    navigate(`/events/${event.id}`);
  };

  return (
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
            xs: 200,
            sm: 250,
            md: 300,
          },
          objectFit: "cover",
        }}
        image={event.event_images?.[0]?.image_location || "https://source.unsplash.com/random?concert"}
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
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={handleLearnMore}>
          Learn More
        </Button>
        <Button 
          size="small" 
          color="error"
          onClick={onUnbook}
        >
          Remove Booking
        </Button>
      </CardActions>
    </Card>
  );
}