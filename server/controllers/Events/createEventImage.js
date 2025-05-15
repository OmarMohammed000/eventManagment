import db from "../../models/index.js";
import cloudinary from "../../utils/cloudinary-config.js";

async function createEventImage(req, res) {
  const eventId = parseInt(req.params.eventId); // Get eventId from URL params

  try {
    // Validate event ID
    if (!eventId) {
      return res.status(400).json({ message: "Event ID is required" });
    }

    // Check if event exists
    const event = await db.Event.findByPk(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check for files
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files provided for upload" });
    }

    // Upload each image to Cloudinary and save the returned URL in the database
    const imageUploadPromises = req.files.map(async (file) => {
      try {
        const result = await cloudinary.uploader.upload(file.path, {
          upload_preset: "esqif1y0",
        });
        return db.EventImage.create({
          image_location: result.secure_url, // Changed to match your model
          event_id: eventId // Changed to match your model
        });
      } catch (uploadError) {
        console.error("Error uploading file to Cloudinary:", uploadError);
        throw uploadError;
      }
    });

    await Promise.all(imageUploadPromises);

    res.status(201).json({ message: "Event images uploaded successfully" });
  } catch (error) {
    console.error("Error creating event images:", error);
    res.status(500).json({ 
      message: "An error occurred while uploading event images",
      error: error.message 
    });
  }
}

export default createEventImage;