import express from "express";
import isAdmin from "../controllers/users/isAdmin.js";
import createEventImage from "../controllers/Events/createEventImage.js";
import deleteEventImages from "../controllers/Events/deleteEventImages.js";
import getEventImage from "../controllers/Events/getEventImage.js";

const app = express.Router();
// Event Images routes
app.get('/api/events/:eventId/images', getEventImage);
app.post('/api/events/images', isAdmin,createEventImage);
app.delete('/api/events/:id/images', isAdmin,deleteEventImages);

export default app;