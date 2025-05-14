import db from "../../models/index.js";

async function getUsers(req, res) {
  try {
    const users = await db.User.findAll({
      attributes: ["id", "email","isAdmin", "createdAt", "updatedAt"],
    });

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "An error occurred while fetching users" });
  }
}
export default getUsers;