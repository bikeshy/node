var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose");

var categoryRout = require("./routes/category.routes");
var productRouter=require("./routes/product.routes");
var usersRout = require("./routes/users");
var cardRout = require("./routes/addTocard.js")

const cors = require('cors');


app.use("/images",express.static('public/images'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use("/api/category",categoryRout,cors());
app.use("/api/product",productRouter,cors());
app.use("/api/user",usersRout,cors());
app.use("/api/card",cardRout,cors());



try {
  var db = mongoose.connect("mongodb://127.0.0.1:27017/cato", {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
  console.log("connected to db");
} catch (error) {
  console.log("DB error");
}
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
