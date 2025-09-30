const Listing = require("../models/Listing");

// GET all listings (public)
const getListings = async (req, res) => {
  try {
    const listings = await Listing.find();
    res.json(listings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET single listing by ID (public)
const getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: "Listing not found" });
    res.json(listing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET logged-in user's listings (protected)
const getMyListings = async (req, res) => {
  try {
    const listings = await Listing.find({ user: req.user });
    res.json(listings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST create a new listing (protected)
const createListing = async (req, res) => {
  try {
    const { title, price, location, lat, lng, image, description, type } = req.body;

    const newListing = new Listing({
      title,
      price,
      location,
      lat,
      lng,
      image,
      description,
      type,        // ✅ include type
      user: req.user,
    });

    const savedListing = await newListing.save();
    res.status(201).json(savedListing);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { getListings, getListingById, getMyListings, createListing };
