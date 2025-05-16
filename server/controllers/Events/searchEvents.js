import db from "../../models/index.js";
import { Op } from "sequelize";

async function searchEvents(req, res) {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ message: "Search query is required" });
  }

  try {
    // First search in event names
    let events = await db.Event.findAll({
      where: {
        event_name: {
          [Op.iLike]: `%${query}%` // Case-insensitive partial match
        }
      },
      attributes: ['id', 'event_name'], // Only return id and name
      include: [
        {
          model: db.EventImage,
          as: 'event_images',
          attributes: ['image_location'],
          limit: 1
        }
      ]
    });

    // If no results found in names, search in descriptions
    if (events.length === 0) {
      events = await db.Event.findAll({
        where: {
          description: {
            [Op.iLike]: `%${query}%`
          }
        },
        attributes: ['id', 'event_name'],
        include: [
          {
            model: db.EventImage,
            as: 'event_images',
            attributes: ['image_location'],
            limit: 1
          }
        ]
      });
    }

    // Format response
    const formattedEvents = events.map(event => ({
      id: event.id,
      event_name: event.event_name,
      image: event.event_images?.[0]?.image_location
    }));

    res.status(200).json(formattedEvents);
  } catch (error) {
    console.error("Error searching events:", error);
    res.status(500).json({ 
      message: "An error occurred while searching events",
      error: error.message 
    });
  }
}

export default searchEvents;