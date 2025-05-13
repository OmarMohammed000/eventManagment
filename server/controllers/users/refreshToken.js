import jwt from "jsonwebtoken";
import db from "../models/index.js";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
async function refreshToken(req, res) {
  const { refreshToken } = req.body;
  // making sure that the refresh token is given
  if (!refreshToken) {
    return res.status(400).json({ message: "Refresh token is required " });
  }
  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    const user = await db.User.findByPk(decoded.id);
    // Check if user exists and token matches
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }
    const accessToken = jwt.sign(
      { id: user.id, email: user.email, isAdmin: user.isAdmin },
      JWT_SECRET,
      {
        expiresIn: "15m",
      }
    );

    return res.json({ accessToken });
  } catch (error) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }
}
export default refreshToken;
