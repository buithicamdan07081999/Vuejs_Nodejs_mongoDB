import mongoose from "mongoose";
const sizeSchema = new mongoose.Schema({
  name: String,
  description: String
});
export default mongoose.model("Size", sizeSchema);