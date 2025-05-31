const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");

//Trả về dữ liệu -> để client (frontend) gọi.
//Nhận request từ frontend
//Trả JSON (danh sách user)

dotenv.config({ path: path.resolve(__dirname, ".env") });
const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
}));
app.use(morgan("dev"));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const connectDB = require("./config/db");
connectDB();
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// Nơi import và khai báo các API
app.use("/api/products", require("./routes/Product/ProductRoutes"));
app.use("/api/categories", require("./routes/Product/CategoryRoutes"));
app.use("/api/upload", require("./routes/Product/UploadRoutes"));
app.use("/api/user", require("./routes/Auth/UserRoutes"));
// file liên quan 
app.use("/api/admin", require("./routes/Auth/AdminRoutes"));
app.use('/api/orders', require("./routes/Order/OrderRoutes"))
// Lắng nghe cổng 5000 hoặc từ .env
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server: http://localhost:${PORT}`);
});
