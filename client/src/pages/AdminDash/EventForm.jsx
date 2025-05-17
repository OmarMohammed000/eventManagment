import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Paper,
  Typography,
  Stack,
  Divider,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from '@mui/material';
import { 
  CloudUpload as CloudUploadIcon, 
  Delete as DeleteIcon,
  Event as EventIcon,
  LocationOn as LocationIcon,
  Description as DescriptionIcon,
  LocalOffer as TagIcon,
} from '@mui/icons-material';
import axios from 'axios';
import apiLink from '../../data/ApiLink';

export default function EventForm({ mode, initialData, onSuccess, onCancel }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    event_name: '',
    description: '',
    venu: '',
    start_date: '',
    end_date: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [tags, setTags] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  
  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setFormData({
        event_name: initialData.event_name,
        description: initialData.description,
        venu: initialData.venu,
        start_date: formatDateTime(initialData.start_date),
        end_date: formatDateTime(initialData.end_date),
      });
      setTags(initialData.tags?.map(tag => tag.id) || []);
      setExistingImages(initialData.event_images || []);
    }
  }, [mode, initialData]);

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16);
  };

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get(`${apiLink}/tags`);
        setAvailableTags(response.data);
      } catch (err) {
        setError("Error fetching tags: " + err.message);
      }
    };
    fetchTags();
  }, []);

  const validateForm = () => {
    const errors = {};
    if (!formData.event_name.trim()) errors.event_name = 'Event name is required';
    if (!formData.description.trim()) errors.description = 'Description is required';
    if (!formData.venu.trim()) errors.venu = 'Venue is required';
    if (!formData.start_date) errors.start_date = 'Start date is required';
    if (!formData.end_date) errors.end_date = 'End date is required';
    
    if (formData.start_date && formData.end_date) {
      if (new Date(formData.end_date) <= new Date(formData.start_date)) {
        errors.end_date = 'End date must be after start date';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    try {
      const formDataToSend = new FormData();
      
      // Send each field individually instead of as JSON
      formDataToSend.append('event_name', formData.event_name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('venu', formData.venu);
      formDataToSend.append('start_date', formData.start_date);
      formDataToSend.append('end_date', formData.end_date);

      // Add images if any
      images.forEach(image => {
        formDataToSend.append('images', image);
      });

      if (mode === 'create') {
        const response = await axios.post(
          `${apiLink}/events`, 
          formDataToSend,
          { 
            withCredentials: true,
            headers: { 'Content-Type': 'multipart/form-data' }
          }
        );

        if (tags.length > 0) {
          await Promise.all(tags.map(tagId => 
            axios.post(
              `${apiLink}/events/${response.data.event.id}/tags/${tagId}`,
              {},
              { withCredentials: true }
            )
          ));
        }

        onSuccess();
      } else {
        // Edit mode
        const formDataToSend = new FormData();
        formDataToSend.append('event_name', formData.event_name);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('venu', formData.venu);
        formDataToSend.append('start_date', formData.start_date);
        formDataToSend.append('end_date', formData.end_date);

        // Add new images if any
        images.forEach(image => {
          formDataToSend.append('images', image);
        });

        await axios.put(
          `${apiLink}/events/${initialData.id}`,
          formDataToSend,
          { 
            withCredentials: true,
            headers: { 'Content-Type': 'multipart/form-data' }
          }
        );

        // Handle tags update
        const currentTags = initialData.tags?.map(tag => tag.id) || [];
        const tagsToAdd = tags.filter(id => !currentTags.includes(id));
        const tagsToRemove = currentTags.filter(id => !tags.includes(id));

        await Promise.all([
          ...tagsToAdd.map(tagId => 
            axios.post(
              `${apiLink}/events/${initialData.id}/tags/${tagId}`,
              {},
              { withCredentials: true }
            )
          ),
          ...tagsToRemove.map(tagId =>
            axios.delete(
              `${apiLink}/events/${initialData.id}/tags/${tagId}`,
              { withCredentials: true }
            )
          )
        ]);

        onSuccess();
      }

      onSuccess();
    } catch (err) {
      console.error('Submit error:', err.response?.data || err.message);
      setError(err.response?.data?.message || "Error creating event: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Box component="form" onSubmit={handleSubmit}>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        
        <Stack spacing={3}>
          <Typography variant="h6" color="primary">
            Event Details
          </Typography>

          <TextField
            fullWidth
            label="Event Name"
            value={formData.event_name}
            onChange={(e) => setFormData(prev => ({ ...prev, event_name: e.target.value }))}
            required
            error={!!formErrors.event_name}
            helperText={formErrors.event_name}
            InputProps={{
              startAdornment: <EventIcon sx={{ mr: 1, color: 'text.secondary' }} />
            }}
          />

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            required
            error={!!formErrors.description}
            helperText={formErrors.description}
            InputProps={{
              startAdornment: <DescriptionIcon sx={{ mr: 1, color: 'text.secondary' }} />
            }}
          />

          <TextField
            fullWidth
            label="Venue"
            value={formData.venu}
            onChange={(e) => setFormData(prev => ({ ...prev, venu: e.target.value }))}
            required
            error={!!formErrors.venu}
            helperText={formErrors.venu}
            InputProps={{
              startAdornment: <LocationIcon sx={{ mr: 1, color: 'text.secondary' }} />
            }}
          />

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="datetime-local"
                label="Start Date"
                value={formData.start_date}
                onChange={(e) => setFormData(prev => ({ ...prev, start_date: e.target.value }))}
                InputLabelProps={{ shrink: true }}
                required
                error={!!formErrors.start_date}
                helperText={formErrors.start_date}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="datetime-local"
                label="End Date"
                value={formData.end_date}
                onChange={(e) => setFormData(prev => ({ ...prev, end_date: e.target.value }))}
                InputLabelProps={{ shrink: true }}
                required
                error={!!formErrors.end_date}
                helperText={formErrors.end_date}
              />
            </Grid>
          </Grid>

          <Divider />

          <Typography variant="h6" color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TagIcon /> Tags & Images
          </Typography>

          <FormControl fullWidth>
            <InputLabel>Tags</InputLabel>
            <Select
              multiple
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => {
                    const tag = availableTags.find(t => t.id === value);
                    return <Chip key={value} label={tag?.name} />;
                  })}
                </Box>
              )}
            >
              {availableTags.map((tag) => (
                <MenuItem key={tag.id} value={tag.id}>
                  {tag.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box>
            <Box sx={{ mb: 2 }}>
              <Button
                variant="outlined"
                component="label"
                startIcon={<CloudUploadIcon />}
              >
                Upload Images
                <input
                  type="file"
                  hidden
                  multiple
                  accept="image/*"
                  onChange={(e) => setImages(Array.from(e.target.files))}
                />
              </Button>
              <Typography variant="caption" sx={{ ml: 2, color: 'text.secondary' }}>
                Maximum 5 images allowed
              </Typography>
            </Box>

            {mode === 'edit' && existingImages.length > 0 && (
              <>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Current Images:
                </Typography>
                <ImageList sx={{ maxHeight: 200 }} cols={4} rowHeight={100}>
                  {existingImages.map((image, index) => (
                    <ImageListItem key={index}>
                      <img
                        src={image.image_location}
                        alt={`Event ${index + 1}`}
                        loading="lazy"
                        style={{ objectFit: 'cover', height: '100%' }}
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </>
            )}

            {images.length > 0 && (
              <>
                <Typography variant="subtitle2" sx={{ mb: 1, mt: 2 }}>
                  {mode === 'edit' ? 'New Images:' : 'Selected Images:'}
                </Typography>
                <ImageList sx={{ maxHeight: 200 }} cols={4} rowHeight={100}>
                  {images.map((image, index) => (
                    <ImageListItem key={index}>
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Preview ${index + 1}`}
                        loading="lazy"
                        style={{ objectFit: 'cover', height: '100%' }}
                      />
                      <ImageListItemBar
                        actionIcon={
                          <IconButton
                            sx={{ color: 'white' }}
                            onClick={() => setImages(prev => prev.filter((_, i) => i !== index))}
                          >
                            <DeleteIcon />
                          </IconButton>
                        }
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </>
            )}

            {mode === 'edit' && images.length > 0 && (
              <Alert severity="warning" sx={{ mt: 2 }}>
                Uploading new images will replace all existing images
              </Alert>
            )}
          </Box>

          <Divider />

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button onClick={onCancel} disabled={loading}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : null}
            >
              {loading ? 'Saving...' : mode === 'create' ? 'Create Event' : 'Save Changes'}
            </Button>
          </Box>
        </Stack>
      </Box>
    </Paper>
  );
}