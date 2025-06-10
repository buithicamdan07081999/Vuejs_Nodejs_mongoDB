const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middlewares/authMiddleware");
const Register = require("../../controllers/User/RegisterController");
const Login = require("../../controllers/User/LoginController");
const GetProfile = require("../../controllers/User/GetProfileController");
const UpdateProfile = require("../../controllers/User/UpdateProfileController");
const UpdateUser = require("../../controllers/User/UpdateProfileController");
const changePassword = require("../../controllers/User/ChangePasswordController");

router.post("/register", Register); //api/user/register
router.post("/login", Login);
router.get("/profile", authMiddleware, GetProfile);
router.put("/profile", authMiddleware, UpdateProfile);
router.put("/update/:id", UpdateUser);        // PUT /api/admin/user/update/:id
router.post('/profile/change/password', authMiddleware, changePassword)
module.exports = router;
