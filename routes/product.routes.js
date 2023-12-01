const {Router}=require("express");
const { productPage } = require("../controller/product.controller");
const productRoute=Router();


productRoute.get("/",productPage);

module.exports={productRoute};