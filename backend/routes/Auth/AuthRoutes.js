const express = require("express");
const router = express.Router();
const { protect } = require("../../middlewares/authMiddleware");
const AuthCtrl = require("../../controllers/User/UserController");

router.post("/register", AuthCtrl.register);
router.post("/login",    AuthCtrl.login);
router.get("/profile",   protect, AuthCtrl.getProfile);
router.put("/profile",   protect, AuthCtrl.updateProfile);

module.exports = router;