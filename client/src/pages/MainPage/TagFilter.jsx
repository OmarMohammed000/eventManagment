import React from 'react';
import { Box, Chip, Divider, Typography } from '@mui/material';

export default function TagFilter({ tags, selectedTag, onTagSelect }) {
  return (
    <Box sx={{ mb: 3, mt: 2 }}>
      <Typography variant="h6" sx={{ mb: 2,  }}>
        Filter by Category
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        <Chip
          label="All Events"
          onClick={() => onTagSelect(null)}
          color={selectedTag === null ? 'primary' : 'default'}
          variant={selectedTag === null ? 'filled' : 'outlined'}
        />
        {tags.map((tag) => (
          <Chip
            key={tag.id}
            label={tag.name}
            onClick={() => onTagSelect(tag.id)}
            color={selectedTag === tag.id ? 'primary' : 'default'}
            variant={selectedTag === tag.id ? 'filled' : 'outlined'}
          />
        ))}
      </Box>
    </Box>
  );
}