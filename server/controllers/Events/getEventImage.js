import db from "../../models/index.js";

async function getEventImages(req, res) {
  const eventId = parseInt(req.params.eventId);
  if (isNaN(eventId)) {
    return res.status(400).json({ message: "Invalid Event ID" });
  }

  try {
    const eventImages = await db.EventImage.findAll({
      where: { event_id: eventId },
      include: [
        {
          model: db.Event,
          as: "event",
          attributes: ["id", "event_name"],
        },
      ],
    });

    if (eventImages.length === 0) {
      return res.status(404).json({ message: "No images found for this event" });
    }

    res.status(200).json(eventImages);
  } catch (error) {
    console.error("Error fetching Event Images:", error);
    res.status(500).json({ message: "An error occurred while fetching the Event Images" });
  }
}
export default getEventImages;