import db from "../../models/index.js";

async function createTag(req, res) {
    const { name } = req.body;

    try {
        if (!name) {
            return res.status(400).json({ message: "Tag name is required" });
        }

        // Create a new tag
        const newTag = await db.Tag.create({
            name: name,
        });

        res.status(201).json({ message: "Tag created successfully", newTag });
    } catch (error) {
        console.error("Error uploading tag:", error);
        res.status(500).json({ message: "Error uploading tag" });
    }
}
export default createTag;