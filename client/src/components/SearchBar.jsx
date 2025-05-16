import React, { useState, useEffect, useRef } from 'react';
import { Box, InputBase, Paper, Typography, List, ListItem, ListItemAvatar, ListItemText, Avatar, ClickAwayListener, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import apiLink from '../data/ApiLink';
import axios from 'axios';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  // Debounced search function
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (searchTerm.trim() === '') {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    timeoutRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${apiLink}/events/search?q=${searchTerm}`);
        setSearchResults(response.data);
        setShowDropdown(true);
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    }, 300); // Debounce delay

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleEventClick = (eventId) => {
    navigate(`/events/${eventId}`);
    setShowDropdown(false);
    setSearchTerm('');
  };

  const handleClickAway = () => {
    setShowDropdown(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box sx={{ position: 'relative', width: '100%', maxWidth: 600 }}>
        <Box
          sx={{
            position: 'relative',
            backgroundColor: 'action.hover',
            borderRadius: 1,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {loading ? (
            <CircularProgress size={20} sx={{ ml: 2 }} />
          ) : (
            <SearchIcon sx={{ ml: 2,  }} />
          )}
          <InputBase 
            placeholder="Search Events..."
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{
              ml: 1,
              flex: 1,
              p: 1,
              color: 'text.primary',
              fontWeight: "light",
            }}
            inputProps={{ 'aria-label': 'search events' }}
          />
        </Box>

        {/* Search Results Dropdown */}
        {showDropdown && (
          <Paper
            sx={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              mt: 1,
              maxHeight: 400,
              overflow: 'auto',
              zIndex: 1300,
            }}
          >
            {loading ? (
              <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                <CircularProgress size={24} />
              </Box>
            ) : searchResults.length > 0 ? (
              <List>
                {searchResults.map((event) => (
                  <ListItem 
                    button 
                    key={event.id}
                    onClick={() => handleEventClick(event.id)}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'action.hover',
                      },
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        variant="rounded"
                        src={event.image || 'https://source.unsplash.com/random?concert'}
                        alt={event.event_name}
                        sx={{ width: 60, height: 60 }}
                      />
                    </ListItemAvatar>
                    <ListItemText 
                      primary={event.event_name}
                      sx={{ ml: 2 }}
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Box sx={{ p: 2, textAlign: 'center' }}>
                <Typography color="text.secondary">
                  No results found
                </Typography>
              </Box>
            )}
          </Paper>
        )}
      </Box>
    </ClickAwayListener>
  );
}
