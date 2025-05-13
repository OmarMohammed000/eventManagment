import db from "../../models";

async function makeUserAdmin(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid User ID" });
  }
  try {
    const user = await db.User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isAdmin = true;
    await user.save();

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Error updating User:", error);
    res.status(500).json({ message: "An error occurred while updating the User" });
  }
}
export default makeUserAdmin;