// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/Auth/UserModels");

// Register user

// Add new Acc
router.post("/register", async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const user = new User({ email, password, role });
    await user.save();
    res.status(201).json({ message: "User registered", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Acc
router.put("/update/:id", async (req, res) => {
    try {
      const updated = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updated);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
