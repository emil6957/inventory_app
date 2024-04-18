const { body, validationResult } = require("express-validator");
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
    res.render("manufacturer_form", {});
});

exports.manufacturer_create_post = [
    body("name", "Name must not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("yearFounded", "Year Founded must be valid.")
        .trim()
        .isLength({ min: 1 })
        .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        const manufacturer = new Manufacturer({
            name: req.body.name,
            yearFounded: req.body.yearFounded,
        });

        if (!errors.isEmpty()) {
            res.render("manufacturer_form", {
                errors: errors.array(),
            });
        }
        else {
            await manufacturer.save();
            res.redirect("../manufacturers");
        }
    }),
]

exports.manufacturer_delete_get = asyncHandler(async (req, res, next) => {
    const name = req.params.id;
    const manufacturer = await Manufacturer.findOne({ name: name });
    res.render("manufacturer_delete", {
        manufacturer: manufacturer
    });
});

exports.manufacturer_delete_post = asyncHandler(async (req, res, next) => {
    await Manufacturer.findByIdAndDelete(req.body.manufacturerid);
    res.redirect("../../manufacturers");
});

exports.manufacturer_update_get = asyncHandler(async (req, res, next) => {
    res.send("TODO manufacturer_update_get");
});

exports.manufacturer_update_post = asyncHandler(async (req, res, next) => {
    res.send("TODO manufacturer_update_post");
});
