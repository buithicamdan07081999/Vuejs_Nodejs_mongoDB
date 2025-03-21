const express = require("express");
const router = express.Router();

// Route để lấy danh sách sản phẩm (ví dụ)
router.get("/", (req, res) => {
    res.json({ message: "Danh sách sản phẩm sẽ được trả về ở đây." });
});

module.exports = router;