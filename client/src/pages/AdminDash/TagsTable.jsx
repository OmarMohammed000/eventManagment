import React, { useState, useEffect } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  IconButton,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import axios from 'axios';
import apiLink from '../../data/ApiLink';

import TagDialog from './TagDialog';
import DeleteTagDialog from './DeleteTagDialog';
import TagTableHeader from './TagTableHeader';
import TableSkeleton from './TableSkeleton';

export default function TagsTable() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState('create');
  const [deleteDialog, setDeleteDialog] = useState(false);

  const fetchTags = async () => {
    try {
      const response = await axios.get(`${apiLink}/tags`);
      setTags(response.data);
    } catch (err) {
      setError("Error fetching tags: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const handleCreateTag = async (name) => {
    try {
      await axios.post(`${apiLink}/tags`, { name }, { withCredentials: true });
      fetchTags();
      setOpenDialog(false);
    } catch (err) {
      setError("Error creating tag: " + err.message);
    }
  };

  const handleEditTag = async (name) => {
    try {
      await axios.put(
        `${apiLink}/tags/${selectedTag.id}`,
        { name },
        { withCredentials: true }
      );
      fetchTags();
      setOpenDialog(false);
      setSelectedTag(null);
    } catch (err) {
      setError("Error updating tag: " + err.message);
    }
  };

  const handleDeleteTag = async () => {
    try {
      await axios.delete(`${apiLink}/tags/${selectedTag.id}`, {
        withCredentials: true,
      });
      fetchTags();
      setDeleteDialog(false);
      setSelectedTag(null);
    } catch (err) {
      setError("Error deleting tag: " + err.message);
    }
  };

  if (loading) return (
    <TableSkeleton 
      headerCells={[
        { label: 'ID', width: 50 },
        { label: 'Name', width: 200 },
        { label: 'Actions', width: 100, align: 'right' }
      ]}
      showAddButton={true}
    />
  );

  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <>
      <TagTableHeader onCreateClick={() => {
        setDialogMode('create');
        setOpenDialog(true);
      }} />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tags.map((tag) => (
              <TableRow key={tag.id}>
                <TableCell>{tag.id}</TableCell>
                <TableCell>{tag.name}</TableCell>
                <TableCell align="right">
                  <IconButton
                    color="primary"
                    onClick={() => {
                      setSelectedTag(tag);
                      setDialogMode('edit');
                      setOpenDialog(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => {
                      setSelectedTag(tag);
                      setDeleteDialog(true);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TagDialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
          setSelectedTag(null);
        }}
        onSubmit={dialogMode === 'create' ? handleCreateTag : handleEditTag}
        mode={dialogMode}
        initialValue={selectedTag?.name || ''}
      />

      <DeleteTagDialog
        open={deleteDialog}
        onClose={() => {
          setDeleteDialog(false);
          setSelectedTag(null);
        }}
        onConfirm={handleDeleteTag}
        tagName={selectedTag?.name}
      />
    </>
  );
}
