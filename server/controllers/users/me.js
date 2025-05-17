import db from "../../models/index.js";

async function me(req, res) {
  try {
    // req.user is set by isAuth middleware
    const user = await db.User.findByPk(req.user.id, {
      attributes: ['id', 'email', 'isAdmin'] // Only send necessary data
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ 
      user: {
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin
      }
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Error fetching user data" });
  }
}

export default me;