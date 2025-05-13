import bcrypt from "bcryptjs";
import db from "../models/index.js";


const saltRounds = environment.config.SALT_ROUNDS || 4;

async function register(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Username,Password and E-mail are required" });
  }
  try {
    const existingUser = await db.User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create the user
    await db.User.create({
      password: hashedPassword,
      email,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res
      .status(500)
      .json({ message: "An error occurred while registering the user" });
  }
}
export default register;