#! /usr/bin/env node

console.log(
    "This script populates the data with cars, manufacturers and bodytypes"
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Car = require("./models/car.js");
const Manufacturer = require("./models/manufacturer.js");
const BodyType = require("./models/bodyType.js");

const cars = [];
const manufacturers = [];
const bodyTypes = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createCars();
    await createManufacturers();
    await createBodyTypes();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
}

async function carCreate(index, name, productionYearStart, productionYearEnd, bodyType, manufacturer, price, amntInStock) {
    const carDetail = {
        name: name,
        productionYearStart: productionYearStart,
        productionYearEnd: productionYearEnd,
        price: price,
        amntInStock, amntInStock,
    }
    if (bodyType != false) carDetail.bodyType = bodyType;
    if (manufacturer != false) carDetail.manufacturer = manufacturer;
    const car = new Car(carDetail);
    await car.save();
    cars[index] = car;
    console.log(`Added car: ${name}`);
}

async function manufacturerCreate(index, name, yearFounded) {
    const manufacturerDetails = {
        name: name,
        yearFounded: yearFounded,
    }
    const manufacturer = new Manufacturer(manufacturerDetails);
    await manufacturer.save();
    manufacturers[index] = manufacturer;
    console.log(`Added manufacturer: ${manufacturer}`);
}

async function bodyTypeCreate(index, type) {
    const bodyType = new BodyType({ type: type });
    await bodyType.save();
    bodyTypes[index] = bodyType;
    console.log(`Added body-type: ${type}`);
}

async function createCars() {
    console.log("Adding genres");
    await Promise.all([
        carCreate(0, "Focus", 1998, 2018, bodyTypes[4], manufacturers[0], 1599, 4),
        carCreate(1, "Focus", 1998, 2018, bodyTypes[1], manufacturers[0], 1999, 2),
        carCreate(2, "Mustang", 1964, 2022, bodyTypes[11], manufacturers[0], 5000, 1),
        carCreate(3, "Golf", 1974, 2019, bodyTypes[4], manufacturers[1], 1299, 12),
        carCreate(4, "Polo", 1975, 2017, bodyTypes[4], manufacturers[1], 1499, 9),
        carCreate(5, "Arteon", 2017, 2017, bodyTypes[1], manufacturers[1], 1799, 0),
        carCreate(6, "A-Class", 2018, 2022, bodyTypes[4], manufacturers[2], 1999, 1),
        carCreate(7, "C-Class", 1993, 2021, bodyTypes[1], manufacturers[2], 1799, 2),
        carCreate(8, "2 Series", 2014, 2021, bodyTypes[0], manufacturers[3], 1399, 4),
        carCreate(9, "4 Series", 2014, 2020, bodyTypes[0], manufacturers[3], 1599, 4),
        carCreate(10, "Z4", 2018, 2022, bodyTypes[6], manufacturers[3], 5599, 1),
        carCreate(11, "5 Series", 1972, 2023, bodyTypes[1], manufacturers[3], 1699, 0),
        carCreate(12, "7 Series", 1977, 2022, bodyTypes[1], manufacturers[3], 1799, 0),
        carCreate(13, "Soul", 2008, 2019, bodyTypes[2], manufacturers[4], 999, 4),
        carCreate(14, "EV6", 2021, 2021, bodyTypes[2], manufacturers[4], 1299, 0),
        carCreate(15, "K5", 2000, 2019, bodyTypes[1], manufacturers[4], 1499, 2),
        carCreate(16, "A1", 2010, 2018, bodyTypes[4], manufacturers[5], 2999, 5),
        carCreate(17, "A4", 1994, 2016, bodyTypes[1], manufacturers[5], 1799, 7),
        carCreate(18, "Q2", 2017, 2020, bodyTypes[2], manufacturers[5], 1799, 9),
        carCreate(19, "Q8", 2018, 2018, bodyTypes[2], manufacturers[5], 1399, 12),
        carCreate(20, "Leaf", 2010, 2021, bodyTypes[4], manufacturers[6], 1599, 1),
        carCreate(21, "Altima", 1992, 2018, bodyTypes[1], manufacturers[6], 1999, 2),
        carCreate(22, "Note", 2004, 2024, bodyTypes[4], manufacturers[6], 1489, 4),
        carCreate(23, "Q8", 2018, 2018, bodyTypes[2], manufacturers[6], 2999, 9),
        carCreate(24, "CX-3", 2015, 2015, bodyTypes[2], manufacturers[7], 2799, 12),
        carCreate(25, "CX-50", 2022, 2022, bodyTypes[2], manufacturers[7], 2999, 0),
        carCreate(26, "CX-5", 2012, 2017, bodyTypes[2], manufacturers[7], 2899, 0),
        carCreate(27, "CX-60", 2022, 2022, bodyTypes[2], manufacturers[7], 3199, 2),
        carCreate(28, "MX-5", 1989, 2015, bodyTypes[6], manufacturers[7], 1999, 1),
        carCreate(29, "Colt", 1962, 2023, bodyTypes[4], manufacturers[7], 1699, 2),
        carCreate(30, "ASX", 2010, 2022, bodyTypes[2], manufacturers[7], 1799, 4),
    ]);
}

async function createManufacturers() {
    console.log("Adding authors");
    await Promise.all([
        manufacturerCreate(0, "Ford"),
        manufacturerCreate(1, "Volkswagen"),
        manufacturerCreate(2, "Mercedes-Benz"),
        manufacturerCreate(3, "BMW"),
        manufacturerCreate(4, "Kia"),
        manufacturerCreate(5, "Audi"),
        manufacturerCreate(6, "Nissan"),
        manufacturerCreate(7, "Mazda"),
        manufacturerCreate(8, "Mitsubishi"),
        manufacturerCreate(9, "Tesla"),
        manufacturerCreate(10, "Fiat"),
        manufacturerCreate(11, "Honda"),
        manufacturerCreate(12, "Ferrari"),
        manufacturerCreate(13, "Porsche"),
        manufacturerCreate(14, "Toyota"),
    ]);
}

async function createBodyTypes() {
    console.log("Adding Books");
    await Promise.all([
        bodyTypeCreate(0, "Coupe"),
        bodyTypeCreate(1, "Sedan"),
        bodyTypeCreate(2, "SUV"),
        bodyTypeCreate(3, "Estate"),
        bodyTypeCreate(4, "Hatchback"),
        bodyTypeCreate(5, "4x4"),
        bodyTypeCreate(6, "Roadster"),
        bodyTypeCreate(7, "Van"),
        bodyTypeCreate(8, "Jeep"),
        bodyTypeCreate(9, "Wagon"),
        bodyTypeCreate(10, "Saloon"),
        bodyTypeCreate(11, "Sports-car")
    ]);
}
