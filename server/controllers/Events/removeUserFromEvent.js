import db from "../../models/index.js";

async function removeUserFromEvent(req, res) {
  const eventId = parseInt(req.params.eventId);
  const userId = parseInt(req.params.userId);

  if (!eventId || !userId) {
    return res.status(400).json({ message: "Event ID and User ID are required" });
  }

  try {
    // Check if the event exists
    const event = await db.Event.findByPk(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if the user is part of the event
    const userEvent = await db.UserEvents.findOne({
      where: { event_id: eventId, user_id: userId },
    });

    if (!userEvent) {
      return res.status(404).json({ message: "User not found in this event" });
    }

    // Remove the user from the event
    await db.UserEvents.destroy({
      where: { event_id: eventId, user_id: userId },
    });

    res.status(200).json({ message: "User removed from event successfully" });
  } catch (error) {
    console.error("Error removing user from event:", error);
    res.status(500).json({ message: "An error occurred while removing the user from the event" });
  }
}
export default removeUserFromEvent; 