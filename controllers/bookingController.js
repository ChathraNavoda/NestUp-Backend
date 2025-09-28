const Booking = require("../models/Booking");

// GET all bookings (public, optional)
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("listing");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET logged-in user's bookings (protected)
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user }).populate("listing");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST create a new booking (protected)
const createBooking = async (req, res) => {
  try {
    const newBooking = new Booking({ ...req.body, user: req.user });
    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { getBookings, getMyBookings, createBooking };
