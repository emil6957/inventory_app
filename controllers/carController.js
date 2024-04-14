const Car = require("../models/car.js");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
    res.send("TODO HOME PAGE");
})

exports.car_list = asyncHandler(async (req, res, next) => {
    res.send("TODO car list");
});

exports.car_detail = asyncHandler(async (req, res, next) => {
    res.send("TODO car detail");
});

exports.car_create_get = asyncHandler(async (req, res, next) => {
    res.send("TODO car GET");
});

exports.car_create_post = asyncHandler(async (req, res, next) => {
    res.send("TODO car POST");
});

exports.car_delete_get = asyncHandler(async (req, res, next) => {
    res.send("TODO car delete GET");
});

exports.car_delete_post = asyncHandler(async (req, res, next) => {
    res.send("TODO car delete POST");
});

exports.car_update_get = asyncHandler(async (req, res, next) => {
    res.send("TODO car update POST");
});

exports.car_update_post = asyncHandler(async (req, res, next) => {
    res.send("TODO car update POST");
});
