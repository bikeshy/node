// require("dotenv").config();
const jwt = require("jsonwebtoken");
const Requestadmin = require("../modals/requestadminModel");
const Admin = require("../modals/adminModel");
const cusRes = require("../midleware/customResponsejson");
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');



exports.generateToken = async (req, res, next) => {
    try {
        const tokens = await Requestadmin.find({});
        if (tokens.length > 0) {
            const Id= tokens[0]._id;
            // Define the update variable
            // const update = req.body;
            const RequestID = uuidv4();
            const update={requesstid:RequestID};
            // Update the document
            const tokensdata = await Requestadmin.findByIdAndUpdate(Id,update, { new: true });
            const updatedToken = await Requestadmin.findById(tokensdata._id);
            const token={
                token: updatedToken.requesstid
            }
            res.status(200).json({
                data: token,
                message: 'Token successfully!'
            });
        } else {
            const RequestID = uuidv4();
            // const { RequestID } = req.body;
            let newRequestadmin = new Requestadmin({ requestid: RequestID });
            newRequestadmin.save()
                .then(response => {
                    return res.status(200).json({
                        data: response,
                        message: 'New token created successfully!'
                    });
                })
                .catch(error => {
                    next(error);
                });
        }
    } catch (error) {
        next(error);
    }
}
exports.register = async (req, res, next) => {
    try {
        const { firstname, lastname, address, mobile, email, password, AccessToken } = req.body;

        // Check if the token in req.body.AccessToken exists in the Requestadmin collection
        const token = await Requestadmin.findOne({ requesstid:AccessToken });

        // If token is not found or if the requestid doesn't match AccessToken, return a 500 status with a "Token mismatch!" message
        if (!token.requesstid) {
            return res.status(500).json({
                message: 'Token mismatch!',
            });
        }

        // Hash the password using bcrypt with 10 rounds of salt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Throw an error if the hashed password is empty or undefined
        if (!hashedPassword) {
            throw new Error('Hashed password is empty or undefined.');
        }

        // Create a new Admin document with the provided user information
        // status in 2 user and isActive in  1 new user 2 aproved user 3 close user and isActivelogin in 1 logout 2 login
        const newAdmin = new Admin({
            name: firstname + ' ' + lastname,
            address: address,
            mobile: mobile,
            email: email,
            password: hashedPassword,
            status:'2',
            isActive:'1',
            isActivelogin:'1'
        });

        // Save the newAdmin document to the database
        await newAdmin.save();

        // Send a success response with a custom response object using cusRes.response
        return res.status(200).send(cusRes.response(true, 200, false, false, "User registered successfully.", false));
    } catch (error) {
        // Pass any caught errors to the error handling middleware
        next(error);
    }
};
exports.AdminList = async (req, res, next) => {
    // const oneadmin = await Admin.findOne({ email: email });
    const adminlist = await Admin.find({});
    res.status(200).json({
        data: adminlist
    });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Admin.findOne({ email: email });
        if (!user) {
            return res.status(401).json({ successStatus: false, statusCode: 401, msg: "Invalid email or password" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ successStatus: false, statusCode: 401, msg: "Invalid email or password" });
        }
        const userstatus = await Admin.findOne({ isActive:user.isActive });
        if(userstatus.isActive=='2'){
            const update={isActivelogin:'2'}
            const admin = await Admin.findByIdAndUpdate(user, update, { new: true });
            return res.status(200).json({ successStatus: true, statusCode: 200, msg: "Logged in successfully!", data: admin });
        }else{
            return res.status(401).json({ successStatus: false, statusCode: 401, msg: "User not aproved" });
        }
    } catch (error) {
        return res.status(500).json({ successStatus: false, statusCode: 500, msg: "Internal server error" });
    }
};


exports.updateuserStatus = async (req, res, next) => {
    try {
        const update = req.body;
        const adminId = req.headers.id;

        // Ensure adminId and update data are present
        if (!adminId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const updatstatus = await Admin.findByIdAndUpdate(adminId, update, { new: true });

        if (!updatstatus) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({
            data: updatstatus,
            message: 'User has been updated successfully',
        });
        } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
};

exports.logout = async (req, res) => {
    const { email} = req.body;

    try {
        const user = await Admin.findOne({ email: email });
        if (!user) {
            return res.status(401).json({ successStatus: false, statusCode: 401, msg: "Invalid email or password" });
        }
        const update={isActivelogin:'1'}
        const admin = await Admin.findByIdAndUpdate(user, update, { new: true });
        return res.status(200).json({ successStatus: true, statusCode: 200, msg: "Logged in successfully!", data: user });
    } catch (error) {
        return res.status(500).json({ successStatus: false, statusCode: 500, msg: "Internal server error" });
    }
};

