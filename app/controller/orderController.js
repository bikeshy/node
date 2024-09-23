const Order = require("../modals/orderModel");
const Card = require("../modals/cardModel");



// Add to cart
exports.addToOrder = async (req, res, next) => {
    try {
        const products = req.body;
        // Iterate through each product in the array
        for (const product of products) {
            const {productid, userId, image, price, title, gst,totalPrice, quantity ,totalQuantity,addressId} = product;

            let newCard = new Order({
                addressId: addressId,
                productId: productid,
                userId: userId,
                image: image,
                productName: title,
                quantity: quantity,
                price: price,
                gstAmount:gst,
                totalPrice:totalPrice,
                totalQuantity:totalQuantity
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
// card list
exports.orderLists = async (req, res, next) => {
    try {
        const cardList = await Order.aggregate([
            {
                $lookup: {
                    from: 'products', // Collection name to join with
                    localField: 'productId', // Field in the 'card' collection
                    foreignField: 'productid', // Field in the 'products' collection
                    as: 'product'
                }
            },
            {
                $unwind: '$product' // Unwind the 'category' array created by $lookup
            },
            {
                $lookup: {
                    from: 'categories',
                    localField: 'product.catId', // Assuming 'catId' is the correct field in the 'products' collection
                    foreignField: 'categoryid', // Assuming '_id' is the correct field in the 'categories' collection
                    as: 'category'
                }
            },
            {
                $unwind: '$category' // Unwind the 'category' array created by $lookup
            }
        ]);
       

        res.status(200).json({ data: cardList });
    } catch (error) {
        console.error('Error fetching products with categories:', error);
        res.status(500).json({ error: 'An error occurred while fetching products with categories' });
    }
};
exports.deleteProduct = async (req, res, next) => {
    try {
    const cardId = req.params.id;
        const carddelete= await Card.findByIdAndDelete(cardId);
        if (carddelete){
        res.status(200).json({
            message:"Card has been deleted"
        });
        }else{
        res.status(500).json({
            message:"Card does not exist"
        });
        }

    } catch (error) {
        next(error)
    }

    exports.prosidTocheckout = async (req, res, next) => {
        try {
            const products = req.body;
            // Iterate through each product in the array
            for (const product of products) {
                const { _id, userId, image, price, title, quantity } = product;
                let newCard = new Card({
                    productId: _id,
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
}

// delete to cart data one by one
exports.deleteOrder = async (req, res, next) => {
    try {
    const cardId = req.params.id;
        const carddelete= await Order.findByIdAndDelete(cardId);
        if (carddelete){
        res.status(200).json({
            message:"Card has been deleted"
        });
        }else{
        res.status(500).json({
            message:"Card does not exist"
        });
        }

    } catch (error) {
        next(error)
    }


}
