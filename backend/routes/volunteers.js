// routes/volunteers.js (note the filename change - add 's')
const express = require("express");
const bcrypt = require("bcryptjs");
const Volunteer = require("../models/Volunteer");

const router = express.Router();

// Test route
router.get("/test", (req, res) => {
  console.log("🔥 Volunteer test route hit");
  res.send("Volunteer routes working");
});

// Register route
router.post("/register", async (req, res) => {
  console.log("🔥 Register route called");
  console.log("Request body:", req.body);
  
  try {
    const { name, email, phone, password, location, availability } = req.body;
    
    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    // Extract coordinates from location object (GeoJSON format from frontend)
    let longitude, latitude;
    if (location && location.coordinates) {
      longitude = location.coordinates[0];
      latitude = location.coordinates[1];
    }

    const existing = await Volunteer.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const volunteer = new Volunteer({
      name,
      email,
      phone,
      passwordHash,
      longitude: longitude ? parseFloat(longitude) : null,
      latitude: latitude ? parseFloat(latitude) : null,
      availability,
    });

    await volunteer.save();
    console.log("✅ Volunteer registered successfully:", volunteer);

    res.status(201).json({
      id: volunteer._id,
      name: volunteer.name,
      email: volunteer.email,
      phone: volunteer.phone,
      longitude: volunteer.longitude,
      latitude: volunteer.latitude,
      availability: volunteer.availability,
      role: "volunteer",
    });
  } catch (err) {
    console.error("❌ Register Error:", err);
    res.status(500).json({ message: "Server error: " + err.message });
  }
});

// Login route
router.post("/login", async (req, res) => {
  console.log("🔥 Login route called");
  console.log("Request body:", req.body);
  
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const volunteer = await Volunteer.findOne({ email });
    if (!volunteer) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, volunteer.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log("✅ Login successful for:", volunteer.email);
    
    res.status(200).json({
      id: volunteer._id,
      name: volunteer.name,
      email: volunteer.email,
      phone: volunteer.phone,
      longitude: volunteer.longitude,
      latitude: volunteer.latitude,
      availability: volunteer.availability,
      role: "volunteer",
    });
  } catch (err) {
    console.error("❌ Login Error:", err);
    res.status(500).json({ message: "Server error: " + err.message });
  }
});

module.exports = router;