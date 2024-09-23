const cors = require('cors');
const jwt =require("jsonwebtoken");
const config = process.env;

const verifyToken=(req,res,next)=>{
    const token =req.body.token||req.query.token||req.headers["token"];

    if (!token) {
        return res.status(403).send({ message: "Token is required for authentication" });
    }
    try {
        // const decoded = jwt.verify(token, config.SECRET);
        const decoded= token
        req.user = decoded;
    } catch (err) {
        return res.status(401).send({ message: "Invalid Token" });
    }
    return next();
};

module.exports = verifyToken;