
const express = require("express");
const Product = require("../models/Products/ProductsModels");

const { getAllProducts, getProductById, getLatestProducts, gettoppriceProducts } = require("../controllers/product/getProductController");

const router = express.Router();
router.get("/", getAllProducts);
router.get("/latest", getLatestProducts);
router.get("/price", getLatestProducts);
router.get("/:id", getProductById);

module.exports = router;