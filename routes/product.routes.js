const {Router}=require("express");
const { productPage, allProducts, addProduct, adminPro, productHomePage, adminProPage } = require("../controller/product.controller");
const { verifyToken, isAdmin } = require("../middleware/auth.middleware");
const productRoute=Router();

// addProduct page
productRoute.get("/add",verifyToken,productPage);

// display all user products
productRoute.get("/allPro",allProducts);

// product home page
productRoute.get("/homeProduct",productHomePage);

// add product by Admin only
productRoute.post("/add",isAdmin,verifyToken,addProduct);

// admin product page

productRoute.get("/adminProPage",adminProPage);

// admin product
productRoute.get("/adminPro",isAdmin,adminPro);

module.exports={productRoute};