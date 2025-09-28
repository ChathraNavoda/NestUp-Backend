const Booking = require("../models/Booking");

// POST create a new booking
const createBooking = async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET all bookings (for admin/testing)
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("listing");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createBooking, getBookings };
