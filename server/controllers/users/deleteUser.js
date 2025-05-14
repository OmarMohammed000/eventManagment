import db from "../../models/index.js";

async function deleteUser(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid User ID" });
  }
  try {
    const result = await db.User.destroy({
      where: { id: id },
    });
    if (result === 0) {
      return res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json({ message: "User deleted successfully" });
    }
  } catch (error) {
    console.error("Error deleting User:", error);
    res.status(500).json({ message: "An error occurred while deleting the User" });
  }
}
export default deleteUser;