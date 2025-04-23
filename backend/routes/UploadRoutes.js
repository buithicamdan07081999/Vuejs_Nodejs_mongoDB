const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require('fs');
const path = require('path');
const uploadDir = path.join(__dirname, "../uploads/products");

// Cấu hình Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// API upload
router.post("/", upload.single("image"), async (req, res) => {
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
  // try {

  //   const oldImage = req.body.oldImage; // Tên file cũ
  //   console.log(oldImage);
  //   if (oldImage) {
  //     const oldImagePath = path.join(uploadDir, oldImage);
  //     console.log('Tên file cũ để xóa: ',oldImage,'_',oldImagePath);
  //     try {
  //       //await fs.access(oldImagePath); // Kiểm tra tồn tại
  //       //await fs.unlink(oldImagePath); // Xóa file
  //       console.log("Đã xóa ảnh cũ:", oldImage);
  //     } catch (err) {
  //       console.log("Không tìm thấy ảnh cũ hoặc lỗi khi xóa:", err.message);
  //     }
  //   }

  //   // Trả về đường dẫn ảnh mới
  //   return res.json({
  //     //image: `http://localhost:5000/uploads/products/${req.file.filename}`,
  //   });
  // } catch (error) {
  //   console.error("Lỗi khi upload ảnh:", error);
  //   return res.status(500).json({ message: "Lỗi server" });
  // }
});

module.exports = router;
