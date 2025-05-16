import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Box } from "@mui/material";

export default function Layout() {
  return (
    <Box sx={{ 
      display: "flex", 
      flexDirection: "column", 
      minHeight: "100vh" 
    }}>
      <NavBar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: { xs: 8, sm: 9 },
          pb: 3,
        }}
      >
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}
