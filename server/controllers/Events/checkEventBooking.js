import db from "../../models/index.js";

async function checkEventBooking(req, res) {
  const eventId = parseInt(req.params.eventId);
  const userId = parseInt(req.query.userId);

  try {
    const booking = await db.UserEvents.findOne({
      where: {
        event_id: eventId,
        user_id: userId
      }
    });

    res.json({ isBooked: !!booking });
  } catch (error) {
    console.error("Error checking booking status:", error);
    res.status(500).json({ message: "Error checking booking status" });
  }
}

export default checkEventBooking;