const express = require("express");
const router = express.Router();

// Route kiểm tra đăng nhập
router.get("/test", (req, res) => {
    res.json({ message: "Auth route hoạt động!" });
});

module.exports = router;
