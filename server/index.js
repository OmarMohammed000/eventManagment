import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import db from "./models/index.js";
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import tagRoutes from "./routes/tagRoute.js";
import userRoutes from "./routes/userRoutes.js";
import eventImageRoutes from "./routes/eventImageRoutes.js";

dotenv.config();

const app = express();

const allowedOrigins = [
  "https://event-managment-git-main-omarmohammed000s-projects.vercel.app",
  "http://localhost:3000"
];

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"],
  })
);

// Routes
app.use("", authRoutes);
app.use("", eventRoutes);
app.use("", tagRoutes);
app.use("", userRoutes);
app.use("", eventImageRoutes);

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT || 3000;

// Database synchronization and server startup
db.sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Database connected successfully`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
