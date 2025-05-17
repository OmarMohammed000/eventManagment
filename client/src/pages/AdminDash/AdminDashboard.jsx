import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Button,
  Container 
} from '@mui/material';
import {
  Event as EventIcon,
  LocalOffer as TagIcon,
  People as UserIcon
} from '@mui/icons-material';
import EventTable from './EventTable';
import TagsTable from './TagsTable';
import UserTable from './UserTable';


function DashboardHome() {
  const navigate = useNavigate();
  
  const dashboardItems = [
    {
      title: 'Events Management',
      icon: <EventIcon fontSize="large" />,
      description: 'Manage events, create new events, and handle bookings',
      path: 'events'
    },
    {
      title: 'Tags Management',
      icon: <TagIcon fontSize="large" />,
      description: 'Manage event tags and categories',
      path: 'tags'
    },
    {
      title: 'Users Management',
      icon: <UserIcon fontSize="large" />,
      description: 'Manage user accounts and permissions',
      path: 'users'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Welcome to Admin Dashboard
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Hello, Admin! What would you like to manage today?
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {dashboardItems.map((item) => (
          <Grid item xs={12} md={4} key={item.path}>
            <Paper
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100%',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: (theme) => theme.shadows[4],
                }
              }}
              onClick={() => navigate(item.path)}
            >
              <Box sx={{ color: 'primary.main', mb: 2 }}>
                {item.icon}
              </Box>
              <Typography variant="h6" gutterBottom>
                {item.title}
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary"
                textAlign="center"
              >
                {item.description}
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 2 }}
                startIcon={item.icon}
                onClick={() => navigate(item.path)}
              >
                Manage {item.title.split(' ')[0]}
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default function AdminDashboard() {
  return (
    <Routes>
      <Route index element={<DashboardHome />} />
      <Route path="events" element={<EventTable />} />
      <Route path="tags" element={<TagsTable />} />
      <Route path="users" element={<UserTable />} />
    </Routes>
  );
}
