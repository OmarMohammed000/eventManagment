import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import { Container } from '@mui/material';

export default function Layout() {
  return (
    <>
    <Container sx={{mb:10}}>
      <NavBar />
    </Container>
      <Outlet />
    </>
  );
}