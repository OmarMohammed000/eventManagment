import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export function isAdmin(req, res, next) {
  const token = req.cookies.jwt || req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    if (!decoded.isAdmin) {
      return res.status(403).json({ message: "Admin access required" });
    }

    // Store the full user object in req for use in route handlers
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
}

export default isAdmin;