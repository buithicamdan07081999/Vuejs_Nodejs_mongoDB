
const express = require("express");
const Product = require("../models/ProductsModels");

// tách riêng các Controller
const { getAllProducts, getProductById } = require("../controllers/product/getProductController");
const { createProduct } = require("../controllers/product/createProductController");
const { updateProduct } = require("../controllers/product/updateProductController");
const { deleteProduct } = require("../controllers/product/deleteProductController");

const router = express.Router();
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
