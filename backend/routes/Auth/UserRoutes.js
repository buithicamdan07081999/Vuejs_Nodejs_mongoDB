const express = require("express");
const router = express.Router();
const protect = require("../../middlewares/authMiddleware");
// Controllers
const Register = require("../../controllers/User/RegisterController");
const Login = require("../../controllers/User/LoginController");
const GetProfile = require("../../controllers/User/GetProfileAdminController");
const UpdateProfile = require("../../controllers/User/UpdateProfileAdminController");

router.post("/register", Register);
router.post("/login", Login);
router.get("/profile", protect, GetProfile);
router.put("/profile", protect, UpdateProfile);

module.exports = router;
