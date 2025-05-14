import db from "../../models/index.js";

async function editTag(req, res) {
  const id = parseInt(req.params.id);
  const { name } = req.body;

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid Tag ID" });
  }

  try {
    // Check if the tag exists
    const tag = await db.Tag.findOne({ where: { id: id } });
    if (!tag) {
      return res.status(404).json({ message: "Tag not found" });
    }

    // Update the tag
    await db.Tag.update(
      { name: name },
      { where: { id: id } }
    );

    res.status(200).json({ message: "Tag updated successfully" });
  } catch (error) {
    console.error("Error updating Tag:", error);
    res.status(500).json({ message: "An error occurred while updating the Tag" });
  }
}
export default editTag;