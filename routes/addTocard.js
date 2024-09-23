
    const card=require("../app/controller/addTcartController.js");
    const Order = require("../app/controller/orderController.js");
    var router = require("express").Router();
    const token=require("../app/midleware/accessToken.js");


// websid api
    router.get("/card-list", token, card.cardLists);
    // router.get("/product-detail/:id", token, product.getProductDetail);
    router.post("/add-card", token, card.addtocard);
    router.post("/add-order", token, Order.addToOrder);

    module.exports = router;