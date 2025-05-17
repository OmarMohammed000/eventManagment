import db from "../../models/index.js";

async function getEventsByTag(req, res) {
  const tagId = parseInt(req.params.tagId);

  try {
    const tag = await db.Tag.findByPk(tagId);
    if (!tag) {
      return res.status(404).json({
        message: "Tag not found",
        code: "TAG_NOT_FOUND"
      });
    }

    const events = await db.Event.findAll({
      include: [
        {
          model: db.Tag,
          as: 'tags',
          where: { id: tagId }
        },
        {
          model: db.EventImage,
          as: 'event_images'
        }
      ]
    });

    if (events.length === 0) {
      return res.status(404).json({
        message: `No events found for category: ${tag.name}`,
        code: "NO_EVENTS_IN_TAG",
        tagName: tag.name
      });
    }

    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events by tag" });
  }
}

export default getEventsByTag;