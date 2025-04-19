
const express = require("express");
const Product = require("../models/Products/ProductsModels");

// tách riêng các Controller
const { getAllProducts, getProductById, getLatestProducts } = require("../controllers/product/getProductController");

const router = express.Router();
router.get("/", getAllProducts);
router.get("/latest", getLatestProducts);
router.get("/:id", getProductById);

module.exports = router;