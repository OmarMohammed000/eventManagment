import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import EventForm from './EventForm';

export default function EventDialog({ 
  open, 
  onClose, 
  mode = 'create',
  event = null,
  onSuccess 
}) {
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        {mode === 'create' ? 'Create New Event' : 'Edit Event'}
      </DialogTitle>
      <DialogContent>
        <EventForm
          mode={mode}
          initialData={event}
          onSuccess={onSuccess}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}