import React from "react";
import NavBar from "../../components/NavBar.jsx";
import HeroSection from "./HeroSection.jsx";
import {  Container, Divider, Typography } from "@mui/material";
import UserEvents from "./UserEvents.jsx";
import Events from "./Events.jsx";

const isloggedIn = false;
export default function MainPage() {
  return (
    <div>
      
      <div sx={{ marginBottom: "64px" }}>
        <HeroSection></HeroSection>
      </div>
      {isloggedIn && <UserEvents></UserEvents>}
      <Container sx={{ marginTop: "64px" }}>
        <Divider>
          <Typography variant="h4" sx={{ fontWeight: "bold",  }}>
            Explore our Events
          </Typography>
         
        </Divider>
        
        <Events></Events>
      </Container>
    </div>
  );
}
