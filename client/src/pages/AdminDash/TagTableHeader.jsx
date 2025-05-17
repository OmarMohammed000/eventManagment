import React from 'react';
import { Box, Typography, Tooltip, Fab } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

export default function TagTableHeader({ onCreateClick }) {
  return (
    <Box
      sx={{
        mb: 3,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography variant="h5" gutterBottom>
        Tags Management
      </Typography>
      <Tooltip title="Add new tag">
        <Fab
          color="primary"
          size="small"
          onClick={onCreateClick}
          sx={{ ml: 2 }}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
    </Box>
  );
}