const Booking = require("../models/booking.model");
const sendEmail = require("../utils/mailer");

// Create new booking
const createBooking = async (req, res) => {
  const { name, email, sessionDate, startTime, endTime, serviceId } = req.body;

  if (!name || !email || !sessionDate || !startTime || !endTime || !serviceId) {
    return res.status(400).json({ message: "All fields are required" });
  }

  Booking.createBooking(req.body, async (err, result) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    // Send confirmation email
    try {
      await sendEmail(
        email,
        "Booking Confirmation",
        `Hello ${name},\n\nYour booking for ${sessionDate} from ${startTime} to ${endTime} has been confirmed.\nService ID: ${serviceId}\n\nThank you!`
      );
    } catch (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({
        message: "Booking created but email failed to send",
        booking: result,
      });
    }

    res.status(201).json({
      message: "Booking created successfully",
      booking: result,
    });
  });
};

// Get all bookings
const getBookings = (req, res) => {
  Booking.getBookings((err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching bookings" });
    }
    res.json(results);
  });
};

module.exports = {
  createBooking,
  getBookings,
};
