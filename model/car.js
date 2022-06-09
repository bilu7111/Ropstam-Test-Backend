const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  name: { type: String, default: null },
  color: { type: String, default: null }, 
  model: { type: String, default: null }, 
  category: { type: String, default: null }, 
  manufacturer: { type: String, default: null },
  registration_no: { type: String, default: null },
});

module.exports = mongoose.model("car", carSchema);