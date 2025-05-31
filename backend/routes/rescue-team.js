// backend/routes/rescueTeam.js - Simple version for testing
const express = require('express');
const router = express.Router();
const RescueTeam = require('../models/RescueTeam');

// Test route
router.get('/test', (req, res) => {
  res.json({ message: "Routes working!" });
});

// Simple login without bcrypt (TEMPORARY - for testing only)
router.post('/login', async (req, res) => {
  console.log('Login attempt:', req.body);
  
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }
    
    console.log('Looking for user:', email);
    const user = await RescueTeam.findOne({ email });
    
    if (!user) {
      console.log('User not found');
      return res.status(401).json({ message: "User not found" });
    }
    
    console.log('User found:', user.email);
    
    // TEMPORARY: Plain text password comparison (INSECURE - only for testing)
    if (user.password !== password) {
      console.log('Password mismatch');
      return res.status(401).json({ message: "Invalid password" });
    }
    
    console.log('Login successful');
    
    // Create session if session middleware is available
    if (req.session) {
      req.session.rescueTeam = { 
        id: user._id, 
        name: user.name, 
        email: user.email,
        teamName: user.teamName 
      };
    }
    
    res.status(200).json({ 
      message: "Login successful", 
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        teamName: user.teamName
      }
    });
    
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ 
      message: "Login failed", 
      error: err.message 
    });
  }
});

// Simple register without bcrypt (TEMPORARY)
router.post('/register', async (req, res) => {
  console.log('Register attempt:', req.body);
  
  try {
    const { name, email, password, phone, teamName } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password required" });
    }
    
    const existing = await RescueTeam.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }
    
    // TEMPORARY: Store plain text password (INSECURE - only for testing)
    const newTeam = new RescueTeam({ 
      name, 
      email, 
      password, // Plain text - ONLY FOR TESTING
      phone: phone || '', 
      teamName: teamName || '' 
    });
    
    await newTeam.save();
    console.log('Registration successful');
    
    res.status(201).json({ message: "Registered successfully" });
    
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ 
      message: "Registration failed", 
      error: err.message 
    });
  }
});

module.exports = router;