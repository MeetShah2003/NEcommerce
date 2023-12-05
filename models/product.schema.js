const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  stock: Number,
  // rating: [{ userId: String, value: Number }],
  size: String,
  color: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "EcomUser" },
});

const productModel = new mongoose.model("EcomProduct", productSchema);

module.exports = { productModel };
