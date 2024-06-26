const { body, validationResult } = require("express-validator");
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
    res.render("bodyType_form", {
        title: "Add New Body Type",
    });
});

exports.bodyType_create_post = [
    body("type", "Type must not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req)

        const bodyType = new BodyType({
            type: req.body.type,
        });

        if (!errors.isEmpty()) {
            res.render("bodyType_form", {
                title: "Add New Body Type",
                errors: errors.array(),
            });
        }
        else {
            await bodyType.save();
            res.redirect("../bodyTypes");
        }
    }),
]

exports.bodyType_delete_get = asyncHandler(async (req, res, next) => {
    const type = req.params.id;
    const bodyType = await BodyType.findOne({ type: type });
    res.render("bodyType_delete", {
        title: `Delete ${bodyType.type}`,
        bodyType: bodyType,
    });
});

exports.bodyType_delete_post = asyncHandler(async (req, res, next) => {
    await BodyType.findByIdAndDelete(req.body.bodyTypeid);
    res.redirect("../../bodyTypes");
});

exports.bodyType_update_get = asyncHandler(async (req, res, next) => {
    const type = req.params.id;
    const bodyType = await BodyType.findOne({ type: type });
    res.render("bodyType_form", {
        bodyType: bodyType,
    });
});

exports.bodyType_update_post = [
    body("type", "Type must not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req)

        const bodyType = new BodyType({
            type: req.body.type,
            _id: req.body.bodyTypeid,
        });

        if (!errors.isEmpty()) {
            res.render("bodyType_form", {
                title: `Update ${bodyType.type}`,
                errors: errors.array(),
            });
        }
        else {
            const updatedBodyType = await BodyType.findByIdAndUpdate(req.body.bodyTypeid, bodyType);
            res.redirect(`../${req.body.type}`);
        }
    }),
]
