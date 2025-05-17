import React, { useState, useEffect } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Alert,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import axios from 'axios';
import apiLink from '../../data/ApiLink';
import TableSkeleton from './TableSkeleton';
import BackToAdminButton from './BackToAdminButton';

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${apiLink}/users`, {
        withCredentials: true
      });
      setUsers(response.data);
    } catch (err) {
      setError("Error fetching users: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleMakeAdmin = async (userId) => {
    try {
      await axios.patch(
        `${apiLink}/users/${userId}/make-admin`,
        {},
        { withCredentials: true }
      );
      fetchUsers(); // Refresh the users list
      setOpenDialog(false);
    } catch (err) {
      setError("Error making user admin: " + err.message);
    }
  };

  if (loading) return (
    <TableSkeleton 
      headerCells={[
        { label: 'ID', width: 50 },
        { label: 'Email', width: 200 },
        { label: 'Admin Status', width: 100 },
        { label: 'Actions', width: 100, align: 'right' }
      ]}
    />
  );

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <>
      <BackToAdminButton />
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          User Management
        </Typography>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Admin Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {user.isAdmin ? (
                    <Typography color="primary">Admin</Typography>
                  ) : (
                    <Typography color="text.secondary">User</Typography>
                  )}
                </TableCell>
                <TableCell>
                  {!user.isAdmin && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        setSelectedUser(user);
                        setOpenDialog(true);
                      }}
                    >
                      Make Admin
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
        <DialogTitle>
          Confirm Admin Status
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to make {selectedUser?.email} an admin?
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>
            Cancel
          </Button>
          <Button 
            onClick={() => handleMakeAdmin(selectedUser?.id)}
            color="primary"
            variant="contained"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
