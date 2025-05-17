import db from "../../models/index.js";
import cloudinary from "../../utils/cloudinary-config.js";

async function createEvent(req, res) {
  try {
    // Access form fields directly from req.body
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

    // Create event
    const newEvent = await db.Event.create({
      event_name,
      description,
      start_date: new Date(start_date),
      end_date: new Date(end_date),
      venu
    });

    // Handle image uploads if present
    if (req.files && req.files.length > 0) {
      const imageUploadPromises = req.files.map(async (file) => {
        try {
          const result = await cloudinary.uploader.upload(file.path, {
            upload_preset: "esqif1y0",
          });
          return db.EventImage.create({
            image_location: result.secure_url,
            event_id: newEvent.id
          });
        } catch (uploadError) {
          console.error("Error uploading file to Cloudinary:", uploadError);
          throw uploadError;
        }
      });

      await Promise.all(imageUploadPromises);
    }

    // Get the created event with its images
    const eventWithImages = await db.Event.findByPk(newEvent.id, {
      include: [
        {
          model: db.EventImage,
          as: 'event_images',
          attributes: ['image_location']
        }
      ]
    });

    res.status(201).json({
      message: "Event created successfully",
      event: eventWithImages
    });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({
      message: "Error creating event",
      error: error.message
    });
  }
}

export default createEvent;