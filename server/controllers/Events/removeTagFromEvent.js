import db from "../../models/index.js";

async function removeTagFromEvent(req, res) {
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

    // Remove the tag from the event
    await event.removeTag(tag);

    res.status(200).json({ message: "Tag removed from event successfully" });
  } catch (error) {
    console.error("Error removing tag from event:", error);
    res.status(500).json({ message: "An error occurred while removing the tag from the event" });
  }
}