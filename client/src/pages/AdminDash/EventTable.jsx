import React, { useState, useEffect } from "react";
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
  Box,
  Avatar,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import EventTableHeader from "./EventTableHeader";
import EventDialog from "./EventDialog";
import DeleteEventDialog from "./DeleteEventDialog";
import axios from "axios";
import apiLink from "../../data/ApiLink";
import TableSkeleton from "./TableSkeleton";
import BackToAdminButton from './BackToAdminButton';

export default function EventTable() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState("create");
  const [deleteDialog, setDeleteDialog] = useState(false);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${apiLink}/events`, {
        withCredentials: true,
      });
      setEvents(response.data);
    } catch (err) {
      setError("Error fetching events: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (loading)
    return (
      <TableSkeleton
        headerCells={[
          { label: "ID", width: 50 },
          { label: "Name", width: 200 },
          { label: "Venue", width: 150 },
          { label: "Date", width: 100 },
          { label: "Tags", width: 150 },
          { label: "Actions", width: 100, align: "right" },
        ]}
        showAddButton={true}
      />
    );

  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <>
      <BackToAdminButton />
      <EventTableHeader
        onCreateClick={() => {
          setDialogMode("create");
          setOpenDialog(true);
        }}
      />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Venue</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Tags</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell>
                  <Avatar
                    variant="rounded"
                    src={event.event_images?.[0]?.image_location}
                    alt={event.event_name}
                    sx={{ width: 56, height: 56 }}
                  />
                </TableCell>
                <TableCell>{event.id}</TableCell>
                <TableCell>{event.event_name}</TableCell>
                <TableCell>{event.venu}</TableCell>
                <TableCell>
                  <Box>
                    <div>Start: {new Date(event.start_date).toLocaleDateString()}</div>
                    <div>End: {new Date(event.end_date).toLocaleDateString()}</div>
                  </Box>
                </TableCell>
                <TableCell>
                  {event.tags?.map((tag) => tag.name).join(", ")}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    color="primary"
                    onClick={() => {
                      setSelectedEvent(event);
                      setDialogMode("edit");
                      setOpenDialog(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => {
                      setSelectedEvent(event);
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

      <EventDialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
          setSelectedEvent(null);
        }}
        mode={dialogMode}
        event={selectedEvent}
        onSuccess={() => {
          fetchEvents();
          setOpenDialog(false);
          setSelectedEvent(null);
        }}
      />

      <DeleteEventDialog
        open={deleteDialog}
        onClose={() => {
          setDeleteDialog(false);
          setSelectedEvent(null);
        }}
        event={selectedEvent}
        onSuccess={() => {
          fetchEvents();
          setDeleteDialog(false);
          setSelectedEvent(null);
        }}
      />
    </>
  );
}
