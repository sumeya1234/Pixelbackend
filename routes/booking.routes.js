const express = require("express");
const router = express.Router();
const bookingController = require("../controller/booking.controller");

// POST - create booking
router.post("/", bookingController.createBooking);

// GET - fetch all bookings
router.get("/", bookingController.getBookings);

module.exports = router;
