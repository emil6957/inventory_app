const express = require("express");
const router = express.Router();

const car_controller = require("../controllers/carController.js");

router.get("/", car_controller.index);

router.get("/car/create", car_controller.car_create_get);
router.post("/car/create", car_controller.car_create_post);

router.get("/car/:id/delete", car_controller.car_delete_get);
router.post("/car/:id/delete", car_controller.car_delete_post);

router.get("/car/:id/update", car_controller.car_update_get);
router.post("/car/:id/update", car_controller.car_update_post);

router.get("/car/:id", car_controller.car_detail);
router.get("/cars", car_controller.car_list);

module.exports = router;
