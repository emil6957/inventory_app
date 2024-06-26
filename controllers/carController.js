const { body, validationResult } = require("express-validator");
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
    const [allCars, allBodyTypes] = await Promise.all([
        Car.find({}, "name manufacturer bodyType")
            .sort({ name: 1 })
            .populate("manufacturer")
            .populate("bodyType")
            .exec(),
        BodyType.find()
            .sort({ type: 1 })
            .exec()
    ]);

    res.render("car_list", { title: "Car List", car_list: allCars, bodyType_list: allBodyTypes });
});

exports.car_detail = asyncHandler(async (req, res, next) => {
    const id = req.params.id
    const car = await Car.findOne({ _id: id })
        .populate("manufacturer")
        .populate("bodyType")
        .exec();
    res.render("car_detail", { title: car.name, car: car })
});

exports.car_create_get = asyncHandler(async (req, res, next) => {
    const [allManufacturers, allBodyTypes] = await Promise.all([
        Manufacturer.find().sort({ name: 1 }).exec(),
        BodyType.find().sort({ type: 1 }).exec(),
    ]);

    res.render("car_form", {
        title: "Add new car",
        manufacturers: allManufacturers,
        bodyTypes: allBodyTypes,
    });
});

exports.car_create_post = [
    (req, res, next) => {
        if (!Array.isArray(req.body.bodyType)) {
            req.body.bodyType =
                typeof req.body.bodyType === "undefined" ? [] : [req.body.bodyType];
        }
        next();

        if (!Array.isArray(req.body.manufacturer)) {
            req.body.manufacturer =
                typeof req.body.manufacturer === "undefined" ? [] : [req.body.manufacturer];
        }
    },

    body("name", "Name must not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("manufacturer", "Manufacturer must not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("productionStartYear", "productionStartYear must not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("productionEndYear", "productionEndYear must not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("amntInStock", "amntInStock must not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("price", "price must not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("bodyType.*").escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const car = new Car({
            name: req.body.name,
            manufacturer: req.body.manufacturer,
            bodyType: req.body.bodyType,
            productionStartYear: req.body.productionStartYear,
            productionEndYear: req.body.productionEndYear,
            price: req.body.price,
            amntInStock: req.body.amntInStock,
        });

        if (!errors.isEmpty()) {

            const [allManufacturers, allBodyTypes] = await Promise.all([
                Manufacturer.find().sort({ name: 1 }).exec(),
                BodyType.find().sort({ type: 1 }).exec(),
            ]);

            console.log("CAR BODYTYPE");
            console.log(car.bodyType);
            console.log("ALL BODY TYPES");
            console.log(allBodyTypes);
            for (const bodyType of allBodyTypes) {
                console.log("SEPERATE BODY TYPE");
                console.log(bodyType);
                if (car.bodyType.includes(bodyType._id)) {
                    bodyType.checked = "true";
                }
            }

            res.render("car_form", {
                name: "Create Car",
                manufacturers: allManufacturers,
                bodyTypes: allBodyTypes,
                car: car,
                errors: errors.array(),
            });
        } else {
            await car.save();
            res.redirect("../cars");
        }
    }),
];

exports.car_delete_get = asyncHandler(async (req, res, next) => {
    const car = await Car.findById(req.params.id).exec();

    if (car === null) {
        res.redirect("/cars/cars");
    }

    res.render("car_delete", {
        car: car,
    });
});

exports.car_delete_post = asyncHandler(async (req, res, next) => {
    await Car.findByIdAndDelete(req.body.carid);
    res.redirect("/cars/cars");
});

exports.car_update_get = asyncHandler(async (req, res, next) => {
    const [car, allManufacturers, allBodyTypes] = await Promise.all([
        Car.findById(req.params.id).populate("manufacturer").populate("bodyType").exec(),
        Manufacturer.find().sort({ name: 1 }).exec(),
        BodyType.find().sort({ type: 1 }).exec(),
    ]);

    if (car === null) {
        const err = new Error("Book not found");
        err.status = 404;
        return next(err);
    }

    res.render("car_form", {
        title: "Update Book",
        car: car,
        manufacturers: allManufacturers,
        bodyTypes: allBodyTypes,
    });
});

exports.car_update_post = [
    (req, res, next) => {
        if (!Array.isArray(req.body.bodyType)) {
            req.body.bodyType =
                typeof req.body.bodyType === "undefined" ? [] : [req.body.bodyType];
        }
        next();

        if (!Array.isArray(req.body.manufacturer)) {
            req.body.manufacturer =
                typeof req.body.manufacturer === "undefined" ? [] : [req.body.manufacturer];
        }
    },

    body("name", "Name must not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("manufacturer", "Manufacturer must not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("productionStartYear", "productionStartYear must not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("productionEndYear", "productionEndYear must not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("amntInStock", "amntInStock must not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("price", "price must not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("bodyType.*").escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const car = new Car({
            name: req.body.name,
            manufacturer: req.body.manufacturer,
            bodyType: req.body.bodyType,
            productionStartYear: req.body.productionStartYear,
            productionEndYear: req.body.productionEndYear,
            price: req.body.price,
            amntInStock: req.body.amntInStock,
            _id: req.params.id,
        });

        if (!errors.isEmpty()) {

            const [allManufacturers, allBodyTypes] = await Promise.all([
                Manufacturer.find().sort({ name: 1 }).exec(),
                BodyType.find().sort({ type: 1 }).exec(),]);

            for (const bodyType of allBodyTypes) {
                if (car.bodyType.includes(bodyType._id)) {
                    bodyType.checked = "true";
                }
            }

            res.render("car_form", {
                name: "Create Car",
                manufacturers: allManufacturers,
                bodyTypes: allBodyTypes,
                car: car,
                errors: errors.array(),
            });
        } else {
            const updatedCar = await Car.findByIdAndUpdate(req.params.id, car);
            res.redirect(`../${updatedCar._id}`);
        }
    }),
]
