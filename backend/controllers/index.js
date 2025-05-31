const Volunteer = require("../models/Volunteer");
const ReportCase = require("../models/ReportCase");
const RescueTeam = require("../models/RescueTeam");

// Volunteer Registration
const registerVolunteer = async (req, res) => {
  try {
    const { name, contact, latitude, longitude } = req.body;
    const volunteer = new Volunteer({
      name,
      contact,
      location: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
    });
    await volunteer.save();
    res.status(201).json(volunteer);
  } catch (error) {
    console.error("Register volunteer error:", error);
    res.status(500).json({ error: error.message || "Failed to register volunteer" });
  }
};

// Report a Case
const reportCase = async (req, res) => {
  try {
    const { animalType, description, latitude, longitude, image } = req.body;
    const report = new ReportCase({
      animalType,
      description,
      image,
      coordinates: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
    });
    await report.save();
    res.status(201).json(report);
  } catch (error) {
    console.error("Report case error:", error);
    res.status(500).json({ error: error.message || "Failed to report case" });
  }
};

// Get All Cases
const getCases = async (req, res) => {
  try {
    const cases = await ReportCase.find().sort({ createdAt: -1 });
    res.status(200).json(cases);
  } catch (error) {
    console.error("Get cases error:", error);
    res.status(500).json({ error: error.message || "Failed to fetch cases" });
  }
};


