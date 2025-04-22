const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// Cấu hình nơi lưu trữ file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/products")); // thư mục lưu ảnh
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // đặt tên file
  },
});

const upload = multer({ storage: storage });

// API upload
router.post("/", upload.single("image"), (req, res) => {
  res.json({ image: `/uploads/products/${req.file.filename}` });
});

module.exports = router;
