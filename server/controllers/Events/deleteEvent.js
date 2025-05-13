import db from "../../models";

async function deleteEvent(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid Event ID" });
  }
  try {
    const result = await db.Event.destory({
      where: { id: id },
    });
    if (result === 0) {
      return res.status(404).json({ message: "Event not found" });
    } else {
      res.status(200).json({ message: "Event deleted successfully" });
    }
  } catch (error) {
    console.error("Error deleting Event:", error);
    res.status(500).json({ message: "An error occurred while deleting the Event" });
  }
}
export default deleteEvent;
