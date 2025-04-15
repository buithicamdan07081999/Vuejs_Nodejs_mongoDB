const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  createdAt: { type: Date, default: Date.now },
  avatar: { type: String, default: "" } // ảnh đại diện (có thể là URL)
});

module.exports = mongoose.model("User", userSchema);
