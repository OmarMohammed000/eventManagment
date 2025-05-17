import db from "../../models/index.js";
import cloudinary from "../../utils/cloudinary-config.js";

async function editEvent(req, res) {
  const id = parseInt(req.params.id);

  try {
    // Parse the form data
    const { event_name, description, start_date, end_date, venu } = req.body;

    // Debug log
    console.log('Received data:', { event_name, description, start_date, end_date, venu });

    // Validate required fields
    if (!event_name || !description || !start_date || !end_date || !venu) {
      return res.status(400).json({ 
        message: "All fields are required",
        received: { event_name, description, start_date, end_date, venu }
      });
    }

    // Find the event
    const event = await db.Event.findByPk(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Update event details
    await event.update({
      event_name,
      description,
      start_date: new Date(start_date),
      end_date: new Date(end_date),
      venu
    });

    // Handle image uploads if present
    if (req.files && req.files.length > 0) {
      // First, delete existing images
      const existingImages = await db.EventImage.findAll({
        where: { event_id: id }
      });

      // Delete from Cloudinary and database
      for (const image of existingImages) {
        try {
          const publicId = image.image_location.split('/').pop().split('.')[0];
          await cloudinary.uploader.destroy(publicId);
        } catch (cloudinaryError) {
          console.error("Error deleting from Cloudinary:", cloudinaryError);
        }
      }

      await db.EventImage.destroy({
        where: { event_id: id }
      });

      // Upload new images
      const imageUploadPromises = req.files.map(async (file) => {
        try {
          const result = await cloudinary.uploader.upload(file.path, {
            upload_preset: "esqif1y0",
          });
          return db.EventImage.create({
            image_location: result.secure_url,
            event_id: id
          });
        } catch (uploadError) {
          console.error("Error uploading file to Cloudinary:", uploadError);
          throw uploadError;
        }
      });

      await Promise.all(imageUploadPromises);
    }

    // Get the updated event with its images
    const updatedEvent = await db.Event.findByPk(id, {
      include: [
        {
          model: db.EventImage,
          as: 'event_images',
          attributes: ['image_location']
        }
      ]
    });

    res.status(200).json({
      message: "Event updated successfully",
      event: updatedEvent
    });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({
      message: "Error updating event",
      error: error.message
    });
  }
}

export default editEvent;