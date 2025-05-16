import React from "react";
import HeroSection from "./HeroSection.jsx";
import { Container, Divider, Typography } from "@mui/material";
import UserEvents from "./UserEvents.jsx";
import Events from "./Events.jsx";
import { useAuth } from "../../context/AuthContext";


export default function MainPage() {
  const { user } = useAuth();
 

  return (
    <div>
      <div sx={{ marginBottom: "64px" }}>
        <HeroSection />
      </div>
      
      {user && (
        <section id="your-events">
          <UserEvents />
        </section>
      )}
      
      <Container sx={{ marginTop: "64px" }}>
        <section id="events">
          <Divider>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              Explore our Events
            </Typography>
          </Divider>
          <Events />
        </section>
      </Container>
    </div>
  );
}
