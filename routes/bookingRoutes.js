const express = require("express");
const router = express.Router();
const { getBookings, getMyBookings, createBooking } = require("../controllers/bookingController");
const authMiddleware = require("../middleware/authMiddleware");

// Protected: get only logged-in user's bookings
router.get("/mine", authMiddleware, getMyBookings);

// Protected: create a booking
router.post("/", authMiddleware, createBooking);

// Optional: get all bookings (public)
router.get("/", getBookings);

module.exports = router;
