const express = require("express"); // for routes
const mongoose = require("mongoose"); // for models
const dotenv = require("dotenv");
const cors = require("cors"); // for router or model?


// Hệ thống mặc định  phải có
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, ".env") });
const morgan = require("morgan");
const connectDB = require("./config/db");
// Hệ thống mặc định  phải có

// for use Routes
dotenv.config();
const app = express();
app.use(express.json());
// app.use(cors());
app.use(cors({
  origin: 'http://localhost:5173', // Hoặc cổng của frontend (Vite mặc định là 5173)
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));

app.use(morgan("dev"));

// Kết nối MongoDB
connectDB();
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));
// Kết nối MongoDB

// Import routes
const productRoutes = require("./routes/ProductRoutes");
app.use("/api/products", productRoutes); // /api/Product FOR CALL API FROM POSTMAN
// NOTE: SAME FILE NAME WITH FILE IN ROUTES
// for use Routes


// Hệ thống mặc định  phải có
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
// Hệ thống mặc định phải có
