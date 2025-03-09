// server Express.js

// Import thư viện và kết nối MongoDB
const express = require("express"); //Framework giúp tạo API nhanh chóng.
const dotenv = require("dotenv"); //Load biến môi trường từ file .env.
const cors = require("cors"); //Cho phép giao tiếp giữa frontend (Vue.js) và backend (Node.js).
const morgan = require("morgan"); //Ghi log request để dễ debug.
const connectDB = require("./config/db"); //Ghi log request để dễ debug.
dotenv.config(); //Load biến môi trường từ .env
connectDB(); //Gọi hàm để kết nối MongoDB

//Khởi tạo app và dùng middleware
const app = express();

app.use(cors()); //Giúp frontend có thể gửi request đến backend mà không bị lỗi CORS
app.use(express.json()); //Cho phép server đọc dữ liệu JSON từ req.body
app.use(morgan("dev")); //Log thông tin request (phương thức, URL, response time...).
  
//Tạo route chính 
app.get('/test', (req, res) => {
  res.json({ message: 'API hoạt động, kết nối thành công backend với frontend!' });
});

//Tạo route chính 
app.get("/", (req, res) => {
    res.send("Đã kết nối thành công đến API...");
  });

// Import và sử dụng productRoutes
// Import các router
const productRoutes = require("./routes/productRoutes"); //Import file productRoutes.js trong thư mục routes/.
// const userRoutes = require("./routes/userRoutes");
// const orderRoutes = require("./routes/orderRoutes");
// const cartRoutes = require("./routes/cartRoutes");
// const paymentRoutes = require("./routes/paymentRoutes");

// Sử dụng các Router
app.use("/api/products", productRoutes); // Tạo API /api/products và giao cho productRoutes.js xử lý.
// app.use("/api/users", userRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/cart", cartRoutes);
// app.use("/api/payments", paymentRoutes);


const PORT = process.env.PORT || 5000; //Lấy PORT từ .env, nếu không có thì dùng 5000
app.listen(PORT, () => { // Chạy server với app.listen(PORT)
  console.log(`Server running on port ${PORT}`);
});
