const mongoose = require("mongoose");

const RescueTeamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Hash in production!
  phone: { type: String },
  teamName: { type: String }
});

module.exports = mongoose.model("RescueTeam", RescueTeamSchema);
