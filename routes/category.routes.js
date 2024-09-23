const Category = require("../app/controller/category.controller");
var router = require("express").Router();
const token=require("../app/midleware/accessToken.js");


router.post("/add-category", token, Category.addCategory);
router.get("/categorylist", token, Category.categoryList);
router.get("/category-edit", token, Category.getCategoryID);
router.post("/category-update", token, Category.updateCategory);
router.get("/category-delete", token, Category.deleteCategory);




module.exports = router;