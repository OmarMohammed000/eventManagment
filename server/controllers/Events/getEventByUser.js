import db from "../../models/index.js";

async function getEventByUser(req,res) {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid User ID" });
    }
    try {
        const events = await db.Event.findAll({
            where: { user_id: userId },
        });
        if (events.length === 0) {
            return res.status(404).json({ message: "No events found for this user" });
        }
        res.status(200).json(events);
    } catch (error) {
        console.error("Error fetching events by user:", error);
        res.status(500).json({ message: "An error occurred while fetching events by user" });
    }
}
export default getEventByUser;