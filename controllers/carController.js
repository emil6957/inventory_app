const Car = require("../models/car.js");
const Manufacturer = require("../models/manufacturer.js");
const BodyType = require("../models/bodyType.js");

const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
    const [
        numCars,
        numManufacturers,
        numBodyTypes,
    ] = await Promise.all([
        Car.countDocuments({}).exec(),
        Manufacturer.countDocuments({}).exec(),
        BodyType.countDocuments({}).exec(),
    ]);

    res.render("index", {
        title: "Cars Home Page",
        car_count: numCars,
        manufacturer_count: numManufacturers,
        bodyType_count: numBodyTypes,
    });
})

exports.car_list = asyncHandler(async (req, res, next) => {
    const allCars = await Car.find({}, "name manufacturer bodyType")
        .sort({ name: 1 })
        .populate("manufacturer")
        .populate("bodyType")
        .exec();

    res.render("car_list", { title: "Car List", car_list: allCars });
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
