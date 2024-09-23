
const session = require('express-session');
const bodyParser = require('body-parser');

// app.use(bodyParser.urlencoded({ extended: true }));

// Session middleware
// app.use(session({
//     // secret: 'your_secret_key',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false } // Set to true if using HTTPS
// }));

// Simple user data for demonstration purposes
// const users = {
//     user1: 'password1',
//     user2: 'password2'
// };

// Middleware to protect routes
exports.checkAuth = async (req, res, next)=> {
    console.log("req.user",req);
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
}
