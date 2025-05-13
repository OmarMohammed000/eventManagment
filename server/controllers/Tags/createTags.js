import db from "../../models";

async function createTag(req, res) {
    const { tag_name } = req.body;

    try {
        if (!tag_name) {
            return res.status(400).json({ message: "Tag name is required" });
        }

        // Create a new tag
        const newTag = await db.Tag.create({
            tag_name: tag_name,
        });

        res.status(201).json({ message: "Tag created successfully", newTag });
    } catch (error) {
        console.error("Error uploading tag:", error);
        res.status(500).json({ message: "Error uploading tag" });
    }
}
export default createTag;