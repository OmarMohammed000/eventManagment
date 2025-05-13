import db from "../../models";

async function deleteTag(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid Tag ID" });
  }
  try {
    const result = await db.Tag.destroy({ where: { tag_id: id } });
    if (result === 0) {
      return res.status(404).json({ message: "Tag not found" });
    }

    res.status(200).json({ message: "Tag deleted successfully" });
  } catch (error) {
    console.error("Error deleting Tag:", error);
    res.status(500).json({ message: "An error occurred while deleting the Tag" });
  }
}
export default deleteTag;