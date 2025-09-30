const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String },
    type: {
      type: String,
      enum: ["Villa", "Apartment", "House"], // allowed values
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Listing", listingSchema);
