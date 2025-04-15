// routes/AuthRoutes.js
const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/Auth/AuthController");

// Login
router.post('/login', AuthController.login);

// Register (dùng controller để hash mật khẩu)
router.post('/register', AuthController.register);

// Update tài khoản
router.put("/update/:id", AuthController.update);

module.exports = router;
