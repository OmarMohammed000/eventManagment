import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Chip,
  Typography,
} from '@mui/material';
import { LocalOffer as TagIcon } from '@mui/icons-material';

export default function TagsSection({ tags, availableTags, onChange }) {
  return (
    <>
      <Typography variant="h6" color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <TagIcon /> Tags
      </Typography>

      <FormControl fullWidth>
        <InputLabel>Tags</InputLabel>
        <Select
          multiple
          value={tags}
          onChange={(e) => onChange(e.target.value)}
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
    </>
  );
}