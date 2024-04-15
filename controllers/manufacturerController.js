const Manufacturer = require("../models/manufacturer.js");
const Car = require("../models/car.js");
const asyncHandler = require("express-async-handler");

// TODO: Remove this index
exports.index = asyncHandler(async (req, res, next) => {
    res.send("TODO manufacturer HOMEPAGE");
});

exports.manufacturer_list = asyncHandler(async (req, res, next) => {
    const allManufacturers = await Manufacturer.find()
        .sort({ name: 1 })
        .exec();

    res.render("manufacturer_list", { manufacturer_list: allManufacturers });
});

exports.manufacturer_detail = asyncHandler(async (req, res, next) => {
    const name = req.params.id;
    const manufacturer = await Manufacturer.findOne({ name });
    const car_list = await Car.find({ manufacturer: manufacturer._id })
        .sort({ name: 1 })
        .exec();
    res.render("manufacturer_detail", { title: manufacturer.name, car_list: car_list });
});

exports.manufacturer_create_get = asyncHandler(async (req, res, next) => {
    res.send("TODO manufacturer_create_get");
});

exports.manufacturer_create_post = asyncHandler(async (req, res, next) => {
    res.send("TODO manufacturer_create_post");
});

exports.manufacturer_delete_get = asyncHandler(async (req, res, next) => {
    res.send("TODO manufacturer_delete_get");
});

exports.manufacturer_delete_post = asyncHandler(async (req, res, next) => {
    res.send("TODO manufacturer_delete_post");
});

exports.manufacturer_update_get = asyncHandler(async (req, res, next) => {
    res.send("TODO manufacturer_update_get");
});

exports.manufacturer_update_post = asyncHandler(async (req, res, next) => {
    res.send("TODO manufacturer_update_post");
});
