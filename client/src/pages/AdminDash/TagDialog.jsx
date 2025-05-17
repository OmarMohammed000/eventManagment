import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';

export default function TagDialog({ 
  open, 
  onClose, 
  onSubmit, 
  mode = 'create',
  initialValue = '',
}) {
  const [tagName, setTagName] = React.useState(initialValue);

  React.useEffect(() => {
    setTagName(initialValue);
  }, [initialValue]);

  const handleSubmit = () => {
    onSubmit(tagName);
    setTagName('');
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {mode === 'create' ? 'Create New Tag' : 'Edit Tag'}
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Tag Name"
          fullWidth
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
          placeholder="Enter tag name..."
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
        >
          {mode === 'create' ? 'Create' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}