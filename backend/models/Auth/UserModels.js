const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Vui lòng nhập tên người dùng"],
    },
    email: {
      type: String,
      required: [true, "Vui lòng nhập email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Vui lòng nhập mật khẩu"],
    },
    phone: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    avatar: {
      type: String,
      default: "", // URL hình đại diện
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);