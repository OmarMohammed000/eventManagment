import db from "../../models";

async function deleteEventImages(req, res) {
  const eventId = parseInt(req.params.id);
  if (isNaN(eventId)) {
    return res.status(400).json({ message: "Invalid Event ID" });
  }

  try {
    // Find the event by ID
    const event = await db.Event.findOne({
      where: { id: eventId },
    });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Delete images from Cloudinary
    for (const image of event.EventImages) {
      // Extract public_id from the URL
      const publicId = image.imageLocation.split('/').pop().split('.')[0];
      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (cloudinaryError) {
        console.error("Error deleting from Cloudinary:", cloudinaryError);
      }
    }

    // Delete the images from database
    await db.EventImage.destroy({
      where: { event_id: eventId },
    });

    res.status(200).json({ message: "Event images deleted successfully" });
  } catch (error) {
    console.error("Error deleting Event images:", error);
    res.status(500).json({ message: "An error occurred while deleting the Event images" });
  }
}
export default deleteEventImages;