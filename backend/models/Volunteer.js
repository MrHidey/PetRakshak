// models/Volunteer.js
const mongoose = require("mongoose");

const volunteerSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true 
  },
  phone: { 
    type: String, 
    required: true,
    trim: true 
  },
  passwordHash: { 
    type: String, 
    required: true 
  },
  longitude: { 
    type: Number,
    required: false 
  },
  latitude: { 
    type: Number,
    required: false 
  },
  availability: { 
    type: String,
    enum: ["Full-time", "Part-time", "Weekends only", "Evenings only", "Flexible"],
    default: "Full-time"
  },
}, { 
  timestamps: true 
});

// Add index for location-based queries
volunteerSchema.index({ longitude: 1, latitude: 1 });

// Add index for email lookups
volunteerSchema.index({ email: 1 });

module.exports = mongoose.model("Volunteer", volunteerSchema);