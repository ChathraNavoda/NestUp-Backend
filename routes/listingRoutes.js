const express = require("express");
const router = express.Router();
const { getListings, getListingById, createListing } = require("../controllers/listingController");

// Routes
router.get("/", getListings);           // GET /api/listings
router.get("/:id", getListingById);    // GET /api/listings/:id
router.post("/", createListing);       // POST /api/listings

module.exports = router;
