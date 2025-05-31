const mongoose = require('mongoose');

const ReportCaseSchema = new mongoose.Schema({
  animalType: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  coordinates: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
      validate: {
        validator: function (coords) {
          const [lng, lat] = coords;
          return lng >= -180 && lng <= 180 && lat >= -90 && lat <= 90;
        },
        message: 'Invalid coordinates: longitude must be between -180 and 180, latitude between -90 and 90',
      },
    },
  },
  imageUrl: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['pending', 'assigned', 'in-progress', 'completed'],
    default: 'pending',
  },
  reportedBy: {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: {
      type: String,
      trim: true,
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please enter a valid email'],
    },
  },
  assignedVolunteer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Volunteer',
    default: null,
  },
  dateReported: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

ReportCaseSchema.index({ coordinates: '2dsphere' });

module.exports = mongoose.model('ReportCase', ReportCaseSchema);