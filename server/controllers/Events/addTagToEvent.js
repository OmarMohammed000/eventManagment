import db from "../../models/index.js";

async function addTagToEvent(req, res) {
  const eventId = parseInt(req.params.eventId);
  const tagId = parseInt(req.params.tagId);

  if (isNaN(eventId) || isNaN(tagId)) {
    return res.status(400).json({ message: "Invalid Event ID or Tag ID" });
  }

  try {
    // Check if the event exists
    const event = await db.Event.findByPk(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if the tag exists
    const tag = await db.Tag.findByPk(tagId);
    if (!tag) {
      return res.status(404).json({ message: "Tag not found" });
    }

    // Add the tag to the event
    await event.addTag(tag);

    res.status(200).json({ message: "Tag added to event successfully" });
  } catch (error) {
    console.error("Error adding tag to event:", error);
    res.status(500).json({ message: "An error occurred while adding the tag to the event" });
  }
}
export default addTagToEvent;