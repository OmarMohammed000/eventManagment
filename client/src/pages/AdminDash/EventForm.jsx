import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Alert,
  CircularProgress,
  Paper,
  Stack,
  Divider,
} from '@mui/material';
import axios from 'axios';
import apiLink from '../../data/ApiLink';
import EventDetailsSection from './EventDetailsSection';
import TagsSection from './TagSection';
import ImageUploadSection from './ImageUploadSection';
import ExitConfirmationDialog from './ExitConfirmationDialog';

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
  const [showExitDialog, setShowExitDialog] = useState(false);
  
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

  const handleCancel = () => {
    // Check if form has been modified
    const isFormModified = 
      formData.event_name !== (initialData?.event_name || '') ||
      formData.description !== (initialData?.description || '') ||
      formData.venu !== (initialData?.venu || '') ||
      formData.start_date !== (initialData?.start_date ? formatDateTime(initialData.start_date) : '') ||
      formData.end_date !== (initialData?.end_date ? formatDateTime(initialData.end_date) : '') ||
      images.length > 0 ||
      JSON.stringify(tags) !== JSON.stringify(initialData?.tags?.map(tag => tag.id) || []);

    if (isFormModified) {
      setShowExitDialog(true);
    } else {
      onCancel();
    }
  };

  return (
    <>
      <Paper sx={{ p: 3 }}>
        <Box component="form" onSubmit={handleSubmit}>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          
          <Stack spacing={3}>
            <EventDetailsSection 
              formData={formData}
              formErrors={formErrors}
              onChange={setFormData}
            />

            <Divider />

            <TagsSection
              tags={tags}
              availableTags={availableTags}
              onChange={setTags}
            />

            <Divider />

            <ImageUploadSection
              mode={mode}
              images={images}
              existingImages={existingImages}
              onImagesChange={setImages}
              onImageDelete={(index) => setImages(prev => prev.filter((_, i) => i !== index))}
            />

            <Divider />

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button onClick={handleCancel} disabled={loading}>
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

      <ExitConfirmationDialog
        open={showExitDialog}
        onClose={() => setShowExitDialog(false)}
        onConfirm={() => {
          setShowExitDialog(false);
          onCancel();
        }}
      />
    </>
  );
}