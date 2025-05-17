import React from 'react';
import {
  TextField,
  Grid,
  Typography,
  Stack,
} from '@mui/material';
import {
  Event as EventIcon,
  LocationOn as LocationIcon,
  Description as DescriptionIcon,
} from '@mui/icons-material';

export default function EventDetailsSection({ formData, formErrors, onChange }) {
  return (
    <Stack spacing={3}>
      <Typography variant="h6" color="primary">
        Event Details
      </Typography>

      <TextField
        fullWidth
        label="Event Name"
        value={formData.event_name}
        onChange={(e) => onChange({ ...formData, event_name: e.target.value })}
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
        onChange={(e) => onChange({ ...formData, description: e.target.value })}
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
        onChange={(e) => onChange({ ...formData, venu: e.target.value })}
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
            onChange={(e) => onChange({ ...formData, start_date: e.target.value })}
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
            onChange={(e) => onChange({ ...formData, end_date: e.target.value })}
            InputLabelProps={{ shrink: true }}
            required
            error={!!formErrors.end_date}
            helperText={formErrors.end_date}
          />
        </Grid>
      </Grid>
    </Stack>
  );
}