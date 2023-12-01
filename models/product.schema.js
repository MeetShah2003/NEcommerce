const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  price: String,
  description: String,
  category: String,
  img: String,
  stock:String,
  rating: [{ userId: String, value: String }],
  size: String,
  color: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "EcomUser" },
});

const productModel = new mongoose.model("EcomProduct", productSchema);

module.exports = { productModel };
