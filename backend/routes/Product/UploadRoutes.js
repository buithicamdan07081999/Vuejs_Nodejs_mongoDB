const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require('fs');
const path = require('path');
const uploadDir = path.join(__dirname, "../uploads/products");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.resolve(__dirname, '..', '..', 'uploads', 'products'));
  },
  filename(req, file, cb) {
    const ext = path.extname(file.originalname) || '.webp';
    cb(null, `${Date.now()}${ext}`);
  }
});

const upload = multer({ storage });
// API upload
router.post("/", upload.single("image"), async (req, res) => {
  console.log("Uploaded file:", req.file);
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    // Xử lý xóa ảnh cũ nếu có
    const oldImg = req.body.oldImage?.split('/').pop(); // chỉ lấy tên file, tránh lỗi đường dẫn
    console.log("[BACKEND] oldImage from client:", req.body.oldImage);
    console.log("[BACKEND] full path to delete:", path.join(uploadDir, req.body.oldImage?.split('/').pop()));

    if (oldImg) {
      const oldPath = path.join(uploadDir, oldImg);
      if (fs.existsSync(oldPath)) {
        try {
          fs.unlinkSync(oldPath);
          console.log("✅ Đã xóa ảnh cũ:", oldImg);
        } catch (err) {
          console.error("❌ Không xóa được ảnh cũ:", err.message);
        }
      }
    }

    // Lưu file mới
    const imagePath = 'http://localhost:5000/uploads/products/' + file.filename;
    return res.json({ image: imagePath });
  } catch (err) {
    console.error('Upload failed:', err);
    return res.status(500).json({ error: 'Upload failed' });
  }
});

module.exports = router;
