import React from 'react';
import { Button } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function BackToAdminButton() {
  const navigate = useNavigate();

  return (
    <Button
      variant="outlined"
      startIcon={<ArrowBackIcon />}
      onClick={() => navigate('/admin')}
      sx={{ mb: 3 }}
    >
      Back to Dashboard
    </Button>
  );
}