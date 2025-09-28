const express = require("express");
const router = express.Router();
const { createBooking, getBookings } = require("../controllers/bookingController");

// Routes
router.post("/", createBooking);   // POST /api/bookings
router.get("/", getBookings);      // GET /api/bookings

module.exports = router;
