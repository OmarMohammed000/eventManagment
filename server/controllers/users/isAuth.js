import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export function isAuth(req, res, next) {
  const token = req.cookies.jwt || req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
}
export default isAuth;