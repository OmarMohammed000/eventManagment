import React, { useState } from 'react';
import EventTable from './EventTable';
import TagsTable from './TagsTable';
import UserTable from './UserTable';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  ButtonGroup,
  Divider 
} from '@mui/material';
import { 
  People as PeopleIcon,
  Event as EventIcon,
  Label as LabelIcon 
} from '@mui/icons-material';

export default function AdminDashboard() {
  const [activeTable, setActiveTable] = useState('users');

  const renderTable = () => {
    switch(activeTable) {
      case 'events':
        return <EventTable />;
      case 'tags':
        return <TagsTable />;
      case 'users':
        return <UserTable />;
      default:
        return <UserTable />;
    }
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to Admin Dashboard
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Manage your events, tags, and users
        </Typography>
      </Box>

      <ButtonGroup 
        variant="contained" 
        sx={{ mb: 4 }}
        size="large"
      >
        <Button
          startIcon={<PeopleIcon />}
          onClick={() => setActiveTable('users')}
          color={activeTable === 'users' ? 'primary' : 'inherit'}
        >
          Users
        </Button>
        <Button
          startIcon={<EventIcon />}
          onClick={() => setActiveTable('events')}
          color={activeTable === 'events' ? 'primary' : 'inherit'}
        >
          Events
        </Button>
        <Button
          startIcon={<LabelIcon />}
          onClick={() => setActiveTable('tags')}
          color={activeTable === 'tags' ? 'primary' : 'inherit'}
        >
          Tags
        </Button>
      </ButtonGroup>

      <Divider sx={{ mb: 4 }} />

      {renderTable()}
    </Container>
  );
}
