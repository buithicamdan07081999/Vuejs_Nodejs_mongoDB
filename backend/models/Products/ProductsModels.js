
const mongoose = require("mongoose");

const variationSchema = new mongoose.Schema({
    color: { type: String, required: true },
    size: { type: String, required: true },
    stock: { type: Number, default: 0 }
  });
  const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    gender: { type: String, enum: ['male', 'female', 'unisex'], default: 'unisex' },
    variations: [variationSchema]
  }, { timestamps: true });
  

module.exports = mongoose.model("ProductModels", productSchema);
// http://localhost:5000/api/products/67e26a680f74a700c20c2642
// {
//     "price": 1000000,
//     "stock": 100,
//     "variations": [
//         {
//             "color": "Red",
//             "size": "M",
//             "stock": 10
//         },
//         {
//             "color": "Red",
//             "size": "L",
//             "stock": 5
//         },
//         {
//             "color": "Black",
//             "size": "M",
//             "stock": 7
//         },
//         {
//             "color": "Black",
//             "size": "L",
//             "stock": 2
//         }
//     ]
// }