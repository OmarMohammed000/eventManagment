import express from "express";
import isAdmin from "../controllers/users/isAdmin";
import createEventImage from "../controllers/events/createEventImage.js";
import deleteEventImages from "../controllers/events/deleteEventImages.js";
import getEventImage from "../controllers/events/getEventImage.js";

const app = express.Router();
// Event Images routes
app.get('/api/events/:eventId/images', getEventImage);
app.post('/api/events/images', isAdmin,createEventImage);
app.delete('/api/events/:id/images', isAdmin,deleteEventImages);

export default app;