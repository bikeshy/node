
    const product=require("../app/controller/product.controller");
    var router = require("express").Router();
    const upload = require('../app/midleware/upload.js');
    const token=require("../app/midleware/accessToken.js");

// admin api
    router.post("/product-add", token, product.uploadImg, product.addproduct);
    router.get("/list", token, product.productList);
    router.get("/product-edit/:id", token, product.getProductID);
    router.post("/product-update/:id", token, product.uploadImg, product.updateProduct);
    router.post("/product-delete/:id", token, product.deleteProduct);

// websid api
    router.get("/list", token, product.productList);
    router.get("/product-detail/:id", token, product.getProductDetail);
    router.post("/add-card", token, product.addtocard);

    module.exports = router;