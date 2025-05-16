import db from "../../models/index.js";

async function getEventById(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid Event ID" });
  }
  try {
    const event = await db.Event.findByPk(id,{
      include: [
        {
          model: db.Tag,
          as: 'tags',
          through: { attributes: [] }, // Excludes junction table attributes
          attributes: ['name']
        },
        {
          model: db.EventImage,
          as: 'event_images',
          attributes: [ 'image_location']
        }
      ]
    });
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    console.error("Error fetching Event:", error);
    res.status(500).json({ message: "An error occurred while fetching the Event" });
  }
}
export default getEventById;