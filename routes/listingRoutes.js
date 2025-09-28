const express = require("express");
const router = express.Router();
const { getListings, getListingById, createListing, getMyListings } = require("../controllers/listingController");
const authMiddleware = require("../middleware/authMiddleware");

// Public: get all listings
router.get("/", getListings);

// Protected: get only logged-in user's listings
router.get("/mine", authMiddleware, getMyListings);

// Public: get a single listing by ID
router.get("/:id", getListingById);

// Protected: create listing
router.post("/", authMiddleware, createListing);

module.exports = router;
