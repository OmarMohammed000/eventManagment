import db from "../../models/index.js";

async function getTags(req, res) {
  try {
    const tags = await db.Tag.findAll({
      attributes: ["id", "name"],
    });

    if (tags.length === 0) {
      return res.status(404).json({ message: "No tags found" });
    }

    res.status(200).json(tags);
  } catch (error) {
    console.error("Error fetching tags:", error);
    res.status(500).json({ message: "An error occurred while fetching the tags" });
  }
}
export default getTags;