// require("dotenv").config();
// const jwt = require("jsonwebtoken");
const Product = require("../modals/productModel");
const Card = require("../modals/cardModel");
const Category = require("../modals/CategoryModel");
const cusRes =require("../midleware/customResponsejson");
const multer = require("multer");
const {v4: uuid} = require('uuid');


// upload image in file and table
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

exports.uploadImg = multer({storage: storage}).single('image');
// add product
exports.addproduct = async (req, res, next) => {
    let newProduct = new Product({
    productName: req.body.productName,
    productid: uuid(),
    title: req.body.title,
    catId: req.body.catId,
    price: req.body.price,
    mrp: req.body.mrp,
    image: req.file.path.replace("public", '').replace(/\\/g, '/')
    })

    newProduct.save().then(response =>{
        return res.status(200).send(cusRes.response(true, 200, false, false, "Product created successfully.", false));

    }).catch (error=> {
        next(error)
    })
}
// get data to category and products table to join
exports.productList = async (req, res, next) => {
    try {
        const productsWithCategories = await Product.aggregate([
            {
                $lookup: {
                    from: 'categories', // Collection name to join with
                    localField: 'catId', // Field in the 'products' collection
                    foreignField: 'categoryid', // Field in the 'categories' collection
                    as: 'category'
                }
            },
            {
                $unwind: '$category' // Unwind the 'category' array created by $lookup
            }
        ]);

        res.status(200).json({ data: productsWithCategories });
    } catch (error) {
        console.error('Error fetching products with categories:', error);
        res.status(500).json({ error: 'An error occurred while fetching products with categories' });
    }
};
// product edit one list api
exports.getProductID = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const userproduct = await Product.findById(productId);
        if (userproduct){
            res.status(200).json({
                data: userproduct,
                message:"One product list"
            });
        }else{
        res.status(500).json({
            message:"Product does not exist"
        });
            return next(new Error('Product does not exist'));
        }
    } catch (error) {
        next(error)
    }
}

// exports.getProductID = async (req, res, next) => {
//     try {
//         const productId = req.headers.id;

//         // Fetch the product by ID
//         const userproduct = await Product.findById(productId);

//         if (!userproduct) {
//             return res.status(404).json({
//                 message: "Product not found"
//             });
//         }

//         // Perform the join operation with categories
//         const joinedData = await Product.aggregate([
//             {
//                 $match: { _id: userproduct._id }
//             },
//             {
//                 $lookup: {
//                     from: 'categories', // Collection name to join with
//                     localField: 'catId', // Field in the 'products' collection
//                     foreignField: 'categoryid', // Field in the 'categories' collection
//                     as: 'category'
//                 }
//             },
//             {
//                 $unwind: '$category' // Unwind the 'category' array created by $lookup
//             }
//         ]);

//         console.log("Joined Data:", joinedData); // Log the joined data

//         if (!joinedData || joinedData.length === 0) {
//             return res.status(500).json({
//                 message: "Error joining data or no categories found"
//             });
//         }

//         // Send the joined data in the response
//         res.status(200).json({
//             data: joinedData,
//             message: "Product with categories"
//         });
//     } catch (error) {
//         console.error("Error fetching product with categories:", error);
//         next(error);
//     }
// };



// product update api

exports.updateProduct = async (req, res, next) => {
    try {
        const update = req.body;
        const productId = req.params.id;

        // Check if a file was uploaded
        if (req.file) {
            // If a new file is uploaded, update the image path
            update.image = req.file.path.replace("public", '').replace(/\\/g, '/');
        } else {
            // If no new file is uploaded, remove the "image" property from the update object
            delete update.image;
        }
       
        // Use the { new: true } option to return the updated document
        const updatedProduct = await Product.findByIdAndUpdate(productId, update, { new: true });

        // Check if product was found and updated
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({
            data: updatedProduct,
            message: 'Product has been updated'
        });
    } catch (error) {
        // Handle any errors
        next(error);
    }
};
// product delete api
exports.deleteProduct = async (req, res, next) => {
    try {
    const userId = req.params.id;
        const productdel= await Product.findByIdAndDelete(userId);
        if (productdel){
        res.status(200).json({
            data: productdel,
            message:"Product has been deleted"
        });
        }else{
        res.status(500).json({
            message:"Product does not exist"
        });
        }

    } catch (error) {
        next(error)
    }


}


exports.getProductDetail = async (req, res, next) => {
    try {
        const productId = req.params.id;

        // Fetch the product by ID
        const userproduct = await Product.findById(productId);

        if (!userproduct) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        // Perform the join operation with categories
        const joinedData = await Product.aggregate([
            {
                $match: { _id: userproduct._id }
            },
            {
                $lookup: {
                    from: 'categories', // Collection name to join with
                    localField: 'catId', // Field in the 'products' collection
                    foreignField: 'categoryid', // Field in the 'categories' collection
                    as: 'category'
                }
            },
            {
                $unwind: '$category' // Unwind the 'category' array created by $lookup
            }
        ]);

        console.log("Joined Data:", joinedData); // Log the joined data

        if (!joinedData || joinedData.length === 0) {
            return res.status(500).json({
                message: "Error joining data or no categories found"
            });
        }

        // Send the joined data in the response
        res.status(200).json({
            data: joinedData,
            message: "Product with categories"
        });
    } catch (error) {
        console.error("Error fetching product with categories:", error);
        next(error);
    }
};


exports.addtocard = async (req, res, next) => {
    try {
        const products = req.body;
        // Iterate through each product in the array
        for (const product of products) {
            const { productid, userId, image, price, title, quantity } = product;
            let newCard = new Card({
                productId: productid,
                userId: userId,
                image: image,
                productName: title,
                quantity: quantity,
                price: price,
            });

          // Save the card to the database
            await newCard.save();
        }

        return res.status(200).send({
            success: true,
            statusCode: 200,
            message: "Added to cart successfully.",
            });
        } catch (error) {
            next(error);
        }
}
