import db from "../../models/index.js";

async function getEventByTag(req, res) {
  const tagId = parseInt(req.params.tagId);
  if (isNaN(tagId)) {
    return res.status(400).json({ message: "Invalid Tag ID" });
  }
  try {
    const events = await db.Event.findAll({
      include: [
        {
          model: db.Tag,
          as: 'tags', // Add this alias to match the model association
          where: { id: tagId },
          through: { attributes: [] },
        },
        {
          model: db.EventImage,
          as: 'event_images' // Include images as well to match the Events component
        }
      ],
    });
    if (events.length === 0) {
      return res.status(404).json({ message: "No events found for this tag" });
    }
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events by tag:", error);
    res.status(500).json({ message: "An error occurred while fetching events by tag" });
  }
}
export default getEventByTag;