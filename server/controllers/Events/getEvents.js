import db from "../../models/index.js";

async function getEvents(req, res) {
  try {
    const events = await db.Event.findAll({
      include: [
        {
          model: db.Tag,
          as: "tags",
          through: { attributes: [] }, 
        },
        {
          model: db.EventImage,
          as: "event_images",
        },
      ],
    });
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching Events:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the Events" });
  }
}
export default getEvents;