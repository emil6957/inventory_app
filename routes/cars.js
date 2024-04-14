const express = require("express");
const router = express.Router();

const car_controller = require("../controllers/carController.js");
const manufacturer_controller = require("../controllers/manufacturerController.js");

router.get("/", car_controller.index);

router.get("/car/create", car_controller.car_create_get);
router.post("/car/create", car_controller.car_create_post);

router.get("/car/:id/delete", car_controller.car_delete_get);
router.post("/car/:id/delete", car_controller.car_delete_post);

router.get("/car/:id/update", car_controller.car_update_get);
router.post("/car/:id/update", car_controller.car_update_post);

router.get("/car/:id", car_controller.car_detail);
router.get("/cars", car_controller.car_list);

router.get("/", manufacturer_controller.index);

router.get("/manufacturer/create", manufacturer_controller.manufacturer_create_get);
router.post("/manufacturer/create", manufacturer_controller.manufacturer_create_post);

router.get("/manufacturer/:id/delete", manufacturer_controller.manufacturer_delete_get);
router.post("/manufacturer/:id/delete", manufacturer_controller.manufacturer_delete_post);

router.get("/manufacturer/:id/update", manufacturer_controller.manufacturer_update_get);
router.post("/manufacturer/:id/update", manufacturer_controller.manufacturer_update_post);

router.get("/manufacturer/:id", manufacturer_controller.manufacturer_detail);
router.get("/manufacturers", manufacturer_controller.manufacturer_list);

module.exports = router;
