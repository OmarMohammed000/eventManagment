import db from "../../models/index.js";

async function createEvent(req, res) {

 const { event_name, event_description,event_start,event_end, event_venue } = req.body;
 try {
  if (!event_name || !event_description || !event_start || !event_end || !event_venue) {
   return res.status(400).json({ message: "All fields are required" });
  }
  // Create a new event
  const newEvent = await db.Event.create({
     event_name,
    description: event_description,
    start_date: event_start,
    end_date: event_end,
    venu: event_venue,
  })
  res.status(201).json({ message: "Event created successfully", newEvent });
 } catch (error) {
  console.error("Error creating event:", error);  
  res.status(500).json({ message: "Error creating event", error });
 }
}
export default createEvent;