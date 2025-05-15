import React from "react";
import { Box, Container, Typography } from "@mui/material";

export default function HeroSection() {
  return (
    <Box
      sx={{
        height: "90vh",
        width: "100%",
        position: "relative",
        display: "flex",
        alignItems: "center",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay
          zIndex: 1,
        },
        backgroundImage: `url('https://images.unsplash.com/photo-1652161154365-e017848af346?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 2, // Place content above the overlay
          color: "white",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h1"
          component="h1"
          sx={{
            fontSize: { xs: "2.5rem", md: "4rem" },
            fontWeight: "bold",
            marginBottom: 2,
            textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
          }}
        >
          Discover. Book. Experience.
        </Typography>
        <Typography
          variant="h5"
          sx={{
            fontSize: { xs: "1.2rem", md: "1.5rem" },
            maxWidth: "800px",
            margin: "0 auto",
            textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
          }}
        >
          Find amazing events around you and book with one click — no hassle, no
          wait.
        </Typography>
      </Container>
    </Box>
  );
}
