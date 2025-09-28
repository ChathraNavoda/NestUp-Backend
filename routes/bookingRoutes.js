const express = require("express");
const router = express.Router();

// Temporary test route
router.get("/", (req, res) => {
  res.json({ message: "NestUp Bookings API is live ✅" });
});

module.exports = router;
