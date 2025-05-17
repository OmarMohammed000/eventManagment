import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { Warning as WarningIcon } from "@mui/icons-material";

export default function ExitConfirmationDialog({ open, onClose, onConfirm }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          color: "warning.main",
        }}
      >
        <WarningIcon color="warning" />
        Confirm Exit
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Are you sure you want to exit? All unsaved changes will be lost.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ p: 2, pt: 0 }}>
        <Button onClick={onClose}>Stay</Button>
        <Button variant="contained" color="warning" onClick={onConfirm}>
          Exit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
