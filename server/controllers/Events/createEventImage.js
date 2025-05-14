import db from "../../models/index.js";
import cloudinary from "../../utils/cloudinary-config.js";

export async function createEventImage(req, res) {
  const jsonData = JSON.parse(req.body.data);
  const { event_id } = jsonData;

  try {
    if (!event_id) {
      return res
        .status(400)
        .json({ message: "Event ID and images are required" });
    }

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
          imageLocation: result.secure_url,
          eventId: event_id, // Use event_id here
        });
      } catch (uploadError) {
        console.error("Error uploading file to Cloudinary:", uploadError);
        throw uploadError;
      }
    });

    await Promise.all(imageUploadPromises);

    res.status(201).json({ message: "Event image created successfully" });
  } catch (error) {
    console.error("Error creating event image:", error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the event image" });
  }
}
export default createEventImage;