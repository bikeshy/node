const users = require("../app/controller/user.controller");
const auth = require("../app/midleware/auth.js");
const admimidleware = require("../app/midleware/adminmidleware");
var router = require("express").Router();
const token=require("../app/midleware/accessToken.js");
const admin = require("../app/controller/admin.controller.js");
const authController = require('../app/controller/authController');
const otpController = require('../app/controller/otpController');
const address = require('../app/controller/adressController.js');


/* GET users listing. */
router.post("/register", token, users.register);
router.get("/userlist", token, users.userList);

router.post("/login", token, users.login);

router.post('/send-otp', otpController.sendOTP);

router.post('/signup', authController.signup);

router.post("/add-address", token, address.address);
router.get("/adress-list", token, address.adressList);
router.get("/adress-list/:id", token, address.getAddressID);


// admin api url

router.get("/getToken", token, admin.generateToken);
router.post("/adminuser", token, admin.register);
router.post("/adminlogin", auth, admin.login);
router.get("/userlists", token, auth, admimidleware.checkAuth,admin.AdminList);
router.post("/updatestatus", token, auth, admimidleware.checkAuth,admin.updateuserStatus);
router.post("/adminlogout", token,admin.logout);

module.exports = router;
