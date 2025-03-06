const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    prod_name: { type: String, required: true },
    prod_price: { type: Number, required: true }
},  { versionKey: false });

const Product = mongoose.model("Product", productSchema);
module.exports = Product;