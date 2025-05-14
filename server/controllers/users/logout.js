import db from "../../models/index.js";

async function logout(req, res) {
  try {
    const userId = req.user.id; // Assuming you have user info in request
    
    // Clear refresh token in database
    await db.User.update(
      { refreshToken: null },
      { where: { id: userId } }
    );

    // Clear access token cookie
    res.clearCookie("jwt");
    
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "An error occurred during logout" });
  }
}

export default logout;