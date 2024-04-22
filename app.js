var createError = require('http-errors');
var express = require('express');
var favicon = require('serve-favicon');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const carsRouter = require("./routes/cars");
// fonts 
// CelebriSans Bold
// Cartograph Sans Heavy
// CelebriSans Bold
// colors
// Laser 1
// #C8B568
var app = express();
app.use(favicon(path.join(__dirname, "public", "images", "logo", "Favicons", "favicon.png")));

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = "mongodb+srv://emil:pTE46PHsIl7swUsb@cluster0.zxoawcx.mongodb.net/inventory?retryWrites=true&w=majority&appName=cluster0"

main().catch((err) => console.error(err));
async function main() {
    await mongoose.connect(mongoDB);
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static("public"));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/cars", carsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

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
