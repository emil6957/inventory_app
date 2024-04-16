const BodyType = require("../models/bodyType.js");
const Car = require("../models/car.js");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
    res.send("TODO bodyType HOMEPAGE");
});

exports.bodyType_list = asyncHandler(async (req, res, next) => {
    const bodyType_list = await BodyType.find({})
        .sort({ type: 1 })
        .exec();
    res.render("bodyType_list", { allBodyTypes: bodyType_list })
});

exports.bodyType_detail = asyncHandler(async (req, res, next) => {
    const type = req.params.id;
    const bodyType_detail = await BodyType.findOne({ type: type })
        .exec();
    const cars = await Car.find({ bodyType: bodyType_detail._id });
    res.render("bodyType_detail", { bodyType: bodyType_detail, cars: cars });
});

exports.bodyType_create_get = asyncHandler(async (req, res, next) => {
    res.send("TODO bodType create_get");
});

exports.bodyType_create_post = asyncHandler(async (req, res, next) => {
    res.send("TODO bodType create_post");
});

exports.bodyType_delete_get = asyncHandler(async (req, res, next) => {
    res.send("TODO bodType delete_get");
});

exports.bodyType_delete_post = asyncHandler(async (req, res, next) => {
    res.send("TODO bodType delete_post");
});

exports.bodyType_update_get = asyncHandler(async (req, res, next) => {
    res.send("TODO bodType update_get");
});

exports.bodyType_update_post = asyncHandler(async (req, res, next) => {
    res.send("TODO bodType update_post");
});
