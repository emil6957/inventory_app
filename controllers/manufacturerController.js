const manufacturer = require("../models/manufacturer.js");
const asyncHandler = require("express-async-handler");

exports.manufacturer_list = asyncHandler(async (req, res, next) => {
    res.send("TODO manufacturer_list");
});

exports.manufacturer_detail = asyncHandler(async (req, res, next) => {
    res.send("TODO manufacturer_detail");
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
