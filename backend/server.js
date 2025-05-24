// Những thư viện gốc cần import
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");

// Khởi tạo Express, đọc biến môi trường
dotenv.config({ path: path.resolve(__dirname, ".env") });
const app = express();

// Cấu hình CORS, đọc JSON, log request
app.use(express.json()); // Cho phép đọc JSON từ request
app.use(cors({
  origin: 'http://localhost:5173', // Cổng frontend (Vite)
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
}));
app.use(morgan("dev")); // Ghi log request

// Dùng cho ảnh upload (hiển thị trong FE)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Kết nối tới database
const connectDB = require("./config/db");
connectDB(); // Gọi hàm kết nối
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// Nơi import và khai báo các API
app.use("/api/products", require("./routes/Product/ProductRoutes"));       // Sản phẩm
app.use("/api/categories", require("./routes/Product/CategoryRoutes"));    // Danh mục
app.use("/api/upload", require("./routes/Product/UploadRoutes"));          // Upload ảnh
app.use("/api/users", require("./routes/Auth/UserRoutes")); // /api/users
app.use("/api/auth", require("./routes/Auth/AuthRoutes")); // /api/auth/login, /api/auth/register
// Lắng nghe cổng 5000 hoặc từ .env
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
