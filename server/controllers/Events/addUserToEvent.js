import db from "../../models/index.js";

async function addUserToEvent(req, res) {
  const eventId = parseInt(req.params.eventId);
  const userId = parseInt(req.params.userId);
  
  try {
    // Input validation
    if (!eventId || !userId) {
      return res.status(400).json({ 
        status: 'error',
        code: 'INVALID_INPUT',
        message: "Invalid event or user ID" 
      });
    }

    // Check if the user exists
    const user = await db.User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ 
        status: 'error',
        code: 'USER_NOT_FOUND',
        message: "User not found" 
      });
    }

    // Check if the event exists and include its details
    const event = await db.Event.findByPk(eventId, {
      include: ['event_images', 'tags']
    });
    
    if (!event) {
      return res.status(404).json({ 
        status: 'error',
        code: 'EVENT_NOT_FOUND',
        message: "Event not found" 
      });
    }

    // Check if event has ended
    if (new Date(event.end_date) < new Date()) {
      return res.status(400).json({
        status: 'error',
        code: 'EVENT_ENDED',
        message: "Cannot book past events"
      });
    }

    // Check if user is already booked
    const existingBooking = await db.UserEvents.findOne({
      where: {
        user_id: userId,
        event_id: eventId
      }
    });

    if (existingBooking) {
      return res.status(400).json({ 
        status: 'error',
        code: 'ALREADY_BOOKED',
        message: "You have already booked this event" 
      });
    }

    // Create the booking
    await db.UserEvents.create({
      user_id: userId,
      event_id: eventId
    });

    // Return success with event details
    res.status(200).json({
      status: 'success',
      message: "Successfully booked event",
      data: {
        event: {
          id: event.id,
          event_name: event.event_name,
          start_date: event.start_date,
          end_date: event.end_date,
          venu: event.venu,
          image: event.event_images?.[0]?.image_location
        },
        booking: {
          userId,
          eventId
        }
      }
    });

  } catch (error) {
    console.error("Error adding user to event:", error);
    res.status(500).json({ 
      status: 'error',
      code: 'SERVER_ERROR',
      message: "Failed to book event. Please try again.",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

export default addUserToEvent;