const express = require("express");
const router = express.Router();
const protect = require("../../middlewares/authMiddleware");
// Controllers
const Register = require("../../controllers/User/RegisterController");
const Login = require("../../controllers/User/LoginController");
const GetProfile = require("../../controllers/User/GetProfileController");
const UpdateProfile = require("../../controllers/User/UpdateProfileController");
const UpdateUser = require("../../controllers/User/UpdateProfileController");

router.post("/register", Register); //api/user/register
router.post("/login", Login);
router.get("/profile", protect, GetProfile);
router.put("/profile", protect, UpdateProfile);
router.put("/update/:id", UpdateUser);        // PUT /api/admin/user/update/:id

module.exports = router;
