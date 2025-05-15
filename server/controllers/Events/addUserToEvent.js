import db from "../../models/index.js";

async function addUserToEvent(req, res) {
  const eventId = parseInt(req.params.eventId);
  const userId = parseInt(req.params.userId);
  
  try {
    // Check if the user exists
    const user = await db.User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the event exists
    const event = await db.Event.findByPk(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Add the user to the event
    await db.UserEvents.create({
      user_id: userId,
      event_id: eventId
    });

    res.status(200).json({ message: "User added to event successfully" });
  } catch (error) {
    console.error("Error adding user to event:", error);
    res.status(500).json({ 
      message: "An error occurred while adding the user to the event",
      error: error.message 
    });
  }
}

export default addUserToEvent;