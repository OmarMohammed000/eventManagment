import db from "../../models";

async function editEvent(req, res) {
  const id = parseInt(req.params.id);
  const { event_name, event_description, event_end, event_start, venue } =
    req.body;
  if (
    !event_name ||
    !event_description ||
    !event_start ||
    !event_end ||
    !venue
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid Event ID" });
  }
  try {
    const event = await db.Event.findByPk(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    event.eventName = event_name;
    event.description = event_description;
    event.startDate = event_start;
    event.endDate = event_end;
    event.venue = venue;
    await event.save();
    res.status(200).json({ message: "Event updated successfully", event });
  } catch (error) {
    console.error("Error updating Event:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the Event" });
  }
}
export default editEvent;