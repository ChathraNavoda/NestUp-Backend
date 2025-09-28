require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");
const Listing = require("./models/Listing");
const Booking = require("./models/Booking");
const bcrypt = require("bcryptjs");

const seed = async () => {
  try {
    // 1. Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    // 2. Clean old data
    await User.deleteMany({});
    await Listing.deleteMany({});
    await Booking.deleteMany({});
    console.log("🗑️  Old data cleared");

    // 3. Create user
    const hashedPassword = await bcrypt.hash("Password123!", 10);
    const user = new User({
      name: "John Doe",
      email: "john@example.com",
      password: hashedPassword,
    });
    await user.save();
    console.log("👤 User created");

    // 4. Create listings
    const listings = [
      {
        title: "Modern Apartment Downtown",
        price: 120,
        location: "City Center",
        image: "https://picsum.photos/300/200?random=1",
        description: "A modern, fully-furnished apartment in the heart of the city.",
        user: user._id,
      },
      {
        title: "Cozy Mountain Cabin",
        price: 90,
        location: "Highlands",
        image: "https://picsum.photos/300/200?random=2",
        description: "A quiet cabin with breathtaking mountain views.",
        user: user._id,
      },
      {
        title: "Beachfront Studio",
        price: 150,
        location: "Sunny Beach",
        image: "https://picsum.photos/300/200?random=3",
        description: "Studio with private balcony facing the sea.",
        user: user._id,
      },
    ];

    const createdListings = await Listing.insertMany(listings);
    console.log("🏠 Listings created");

    // 5. Create bookings
    const bookings = [
      {
        listing: createdListings[0]._id,
        user: user._id,
        userName: user.name,
        checkIn: new Date("2025-11-01"),
        checkOut: new Date("2025-11-05"),
      },
      {
        listing: createdListings[1]._id,
        user: user._id,
        userName: user.name,
        checkIn: new Date("2025-12-10"),
        checkOut: new Date("2025-12-15"),
      },
      {
        listing: createdListings[2]._id,
        user: user._id,
        userName: user.name,
        checkIn: new Date("2026-01-05"),
        checkOut: new Date("2026-01-10"),
      },
    ];

    await Booking.insertMany(bookings);
    console.log("📅 Bookings created");

    console.log("🎉 Seed finished successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  }
};

seed();
