// require("dotenv").config();
// const jwt = require("jsonwebtoken");
const Users = require("../modals/userModel");
const cusRes =require("../midleware/customResponsejson");
const bcrypt = require('bcrypt');


exports.register = async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        let newUser = new Users({
            name: name,
            email: email,
            password: hashedPassword
        });

        newUser.save().then(response => {
            return res.status(200).json({
                successStatus: true,
                data:response,
                statusCode: 200,
                data: newUser,
                message: 'User registered successfully.'
            });
        }).catch(error => {
            next(error); // Pass any caught error to the error handler middleware
        });
    } catch (error) {
        next(error); // Catch and pass any hashing errors to the error handler middleware
    }
};
exports.userList = async (req, res, next) => {
    const User = await Users.find({});
    res.status(200).json({
        data: User
    });
}

exports.getUserID = async (req, res, next) => {
    try {
        const userID = req.headers.id;
        const users = await Users.findById(userID);
        if (users){
            res.status(200).json({
                data: users,
                message:"One User list"
            });
        }else{
        res.status(500).json({
            message:"User does not exist"
        });
            return next(new Error('User does not exist'));
        }
    } catch (error) {
        next(error)
    }
}
exports.updateuser = async (req, res, next) => {
    try {
    let update = req.body
    const userID = req.headers.id;
    await Users.findByIdAndUpdate(userID, update);
    const users = await User.findById(userID)
    res.status(200).json({
        data: users,
        message: 'Product has been updated'
    });
    } catch (error) {
        next(error)
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
    const userId = req.headers.id;
        const users= await Users.findByIdAndDelete(userId);
        if (users){
        res.status(200).json({
            data: users,
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
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Users.findOne({ email: email });
        if (!user) {
            return res.status(401).json({ successStatus: false, statusCode: 401, msg: "Invalid email or password" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ successStatus: false, statusCode: 401, msg: "Invalid email or password" });
        }

        return res.status(200).json({ successStatus: true, statusCode: 200, msg: "Logged in successfully!", data: user });
    } catch (error) {
        return res.status(500).json({ successStatus: false, statusCode: 500, msg: "Internal server error" });
    }
};

