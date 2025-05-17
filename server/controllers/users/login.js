import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../../models/index.js";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

async function login(req, res) {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await db.User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate access token
    const accessToken = jwt.sign(
      { 
        id: user.id, 
        email: user.email,
        isAdmin: user.isAdmin 
      },
      JWT_SECRET,
      { expiresIn: "30m" }
    );

    // Generate refresh token
    const refreshToken = jwt.sign(
      { id: user.id },
      JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    // Store refresh token in database
    await user.update({ refreshToken });

    // Set access token in HTTP-only cookie
    res.cookie("jwt", accessToken, {
      httpOnly: true,
      secure: true, // Always use secure in production
      sameSite: 'none', // Required for cross-site cookies
      maxAge: 120 * 60 * 1000, // 120 minutes
      path: '/'
    });

    res.json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin
      },
      accessToken,
      refreshToken
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "An error occurred during login" });
  }
}

export default login;