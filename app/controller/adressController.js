const Address = require("../modals/addressModel");
const cusRes =require("../midleware/customResponsejson");
const {v4: uuid} = require('uuid');

// add Address
exports.address = async (req, res, next) => {
    let newAddress = new Address({
    addressId:uuid(),
    name: req.body.name,
    mobile: req.body.mobile ,
    state: req.body.state,
    city: req.body.city,
    address: req.body.address,
    pincode: req.body.pincode,
    landmark: req.body.landmark,

    })

    newAddress.save().then(response =>{
        return res.status(200).send(cusRes.response(true, 200, false, false, "Address created successfully.", false));

    }).catch (error=> {
        next(error)
    })
}
// get data to Address table to join
exports.adressList = async (req, res, next) => {
    try {
        const addressList = await Address.find({});

        res.status(200).json({ data: addressList });
    } catch (error) {
        console.error('Error fetching address with categories:', error);
        res.status(500).json({ error: 'An error occurred while fetching address with categories' });
    }
};
// Address edit one list api
exports.getAddressID = async (req, res, next) => {
    try {
        const addressId = req.params.id;
        const addressFind = await Address.findById(addressId);
        if (addressFind){
            res.status(200).json({
                data: addressFind,
                message:"One address list"
            });
        }else{
        res.status(500).json({
            message:"address does not exist"
        });
            return next(new Error('address does not exist'));
        }
    } catch (error) {
        next(error)
    }
}




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
