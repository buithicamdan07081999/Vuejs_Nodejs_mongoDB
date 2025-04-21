
const express = require("express");

const { getAllProducts, getProductById, getLatestProducts, gettoppriceProducts } = require("../controllers/product/getProductController");

const router = express.Router();
router.get("/", getAllProducts);
router.get("/latest", getLatestProducts);
router.get("/price", gettoppriceProducts);
router.get("/:id", getProductById);

module.exports = router;