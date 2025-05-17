import db from "../../models/index.js";
import cloudinary from "../../utils/cloudinary-config.js";

async function deleteEvent(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid Event ID" });
  }

  try {
    // First, get the event to check if it exists and get its images
    const event = await db.Event.findByPk(id, {
      include: [
        {
          model: db.EventImage,
          as: 'event_images',
          attributes: ['image_location']
        }
      ]
    });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Delete images from Cloudinary
    if (event.event_images?.length > 0) {
      for (const image of event.event_images) {
        try {
          const publicId = image.image_location.split('/').pop().split('.')[0];
          await cloudinary.uploader.destroy(publicId);
        } catch (cloudinaryError) {
          console.error("Error deleting from Cloudinary:", cloudinaryError);
        }
      }
    }

    // Delete the event (this will cascade delete related records)
    const result = await db.Event.destroy({
      where: { id: id }
    });

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting Event:", error);
    res.status(500).json({ message: "An error occurred while deleting the Event" });
  }
}

export default deleteEvent;
