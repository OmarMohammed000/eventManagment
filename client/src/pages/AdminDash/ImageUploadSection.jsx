import React from 'react';
import {
  Box,
  Button,
  Typography,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
  Alert,
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

export default function ImageUploadSection({ 
  mode, 
  images, 
  existingImages, 
  onImagesChange, 
  onImageDelete 
}) {
  return (
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
            onChange={(e) => onImagesChange(Array.from(e.target.files))}
          />
        </Button>
        <Typography variant="caption" sx={{ ml: 2, color: 'text.secondary' }}>
          Maximum 5 images allowed
        </Typography>
      </Box>

      {mode === 'edit' && existingImages?.length > 0 && (
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
                      onClick={() => onImageDelete(index)}
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
  );
}