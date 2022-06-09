const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, default: null }
});

module.exports = mongoose.model("category", categorySchema);