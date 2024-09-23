
const Category = require("../modals/CategoryModel.js");
const cusRes =require("../midleware/customResponsejson");
const dbConfig = require("../config/db.config.js");
const uploadFile = require("../midleware/upload.js");
const {v4: uuid} = require('uuid');


exports.addCategory = async (req, res, next) => {
    let newProduct = new Category({
        categoryid: uuid(),
        categoryName: req.body.categoryName,
    })
    newProduct.save().then(response =>{
        return res.status(200).send(cusRes.response(true, 200, false, false, "Category created successfully.", false));

    }).catch (error=> {
        next(error)
    })
}
exports.categoryList = async (req, res, next) => {
    const categoris = await Category.find({});
    res.status(200).json({
        data: categoris
    });
}

exports.getCategoryID = async (req, res, next) => {
    try {
        const categoryId = req.headers.id;
        const userCategory = await Category.findById(categoryId);
        if (userCategory){
            res.status(200).json({
                data: userCategory,
                message:"One Category list"
            });
        }else{
        res.status(500).json({
            message:"Category does not exist"
        });
            return next(new Error('Category does not exist'));
        }
    } catch (error) {
        next(error)
    }
}

exports.updateCategory = async (req, res, next) => {
    try {
        const update = req.body;
        const catId = req.headers.id;

        // Ensure catId and update data are present
        if (!catId) {
            return res.status(400).json({ error: 'Category ID is required' });
        }

        const category = await Category.findByIdAndUpdate(catId, update, { new: true });

        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        res.status(200).json({
            data: category,
            message: 'Category has been updated successfully',
        });
        } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
};
// product delete api
exports.deleteCategory = async (req, res, next) => {
    try {
            const catId = req.headers.id;

            // Check if the category ID is valid
            if (!catId) {
                return res.status(400).json({ error: 'Category ID is required' });
            }

            const deletedCategory = await Category.findByIdAndDelete(catId);

            if (deletedCategory) {
                res.status(200).json({
                    data: deletedCategory,
                    message: 'Category has been deleted',
                });
            } else {
                res.status(404).json({ error: 'Category not found' });
            }
        } catch (error) {
            next(error); // Pass the error to the error handling middleware
        }

}

