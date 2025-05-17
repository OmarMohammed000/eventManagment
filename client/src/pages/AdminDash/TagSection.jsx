import React from 'react';
import {
  Chip,
  Typography,
  Autocomplete,
  TextField
} from '@mui/material';
import { LocalOffer as TagIcon } from '@mui/icons-material';

export default function TagsSection({ tags, availableTags, onChange }) {
  return (
    <>
      <Typography variant="h6" color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <TagIcon /> Tags
      </Typography>

      <Autocomplete
        multiple
        value={availableTags.filter(tag => tags.includes(tag.id))}
        onChange={(_, newValue) => {
          onChange(newValue.map(tag => tag.id));
        }}
        options={availableTags}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Select Tags"
            placeholder="Choose tags"
          />
        )}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => (
            <Chip
              label={option.name}
              {...getTagProps({ index })}
              key={option.id}
            />
          ))
        }
      />
    </>
  );
}