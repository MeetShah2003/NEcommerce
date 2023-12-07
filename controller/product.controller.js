const { productModel } = require("../models/product.schema");

const productPage = (req, res) => {
  return res.render("addProduct");
};

const productHomePage = (req, res) => {
  return res.render("home");
};

const allProducts = async (req, res) => {
  try {
    let products = await productModel.find();
    return res.status(200).send(products);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

const addProduct = async (req, res) => {
  try {
    req.body.createdBy = req.user.id;
    let data = await productModel.create(req.body);
    return res.status(200).send({ product: data });
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

const adminProPage = (req, res) => {
  return res.render("adminPro");
};

const adminPro = async (req, res) => {
  try {
    let adminProducts = await productModel.find({ createdBy: req.user.id });
    return res.status(200).send(adminProducts);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

module.exports = {
  productPage,
  productHomePage,
  allProducts,
  addProduct,
  adminProPage,
  adminPro,
};
