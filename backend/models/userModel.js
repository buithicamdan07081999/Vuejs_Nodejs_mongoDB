const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Định nghĩa Schema User
const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    { timestamps: true }
);

// Hash mật khẩu trước khi lưu
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    if (!this.password) {
        console.error("LỖI: Mật khẩu bị undefined trước khi hash!");
        return next(new Error("Password is undefined"));
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});


const User = mongoose.model("User", userSchema);
module.exports = User;
