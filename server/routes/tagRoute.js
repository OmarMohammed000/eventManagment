import express from "express";
import createTags from "../controllers/Tags/createTags.js";
import getTags from "../controllers/Tags/getTags.js";
import editTags from "../controllers/Tags/editTags.js";
import deleteTags from "../controllers/Tags/deleteTags.js";
import isAdmin from "../controllers/users/isAdmin.js";

// Tag routes
const router = express.Router();

router.get("/api/tags", getTags);
router.post("/api/tags", isAdmin, createTags);
router.put("/api/tags/:id", isAdmin, editTags);
router.delete("/api/tags/:id", isAdmin, deleteTags);

export default router;
