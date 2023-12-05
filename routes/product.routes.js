const {Router}=require("express");
const { productPage, allProducts, addProduct, adminPro } = require("../controller/product.controller");
const { verifyToken, isAdmin } = require("../middleware/auth.middleware");
const productRoute=Router();

productRoute.get("/add",verifyToken,productPage);

productRoute.get("/allPro",verifyToken,allProducts);

productRoute.post("/add",isAdmin,verifyToken,addProduct);

// admin product
productRoute.get("/adminPro",isAdmin,adminPro);

module.exports={productRoute};