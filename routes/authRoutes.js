const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getMe } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

// Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", authMiddleware, getMe); // <-- add this

module.exports = router;
