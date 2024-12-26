const captainController = require("../controllers/captain.controller");
const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("invalid Email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("password must be greater then at least 3 words"),
    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("color must be at least 3 words"),
    body("vehicle.plate")
      .isLength({ min: 3 })
      .withMessage("Plate must be greater then at least 3 words"),
    body("vehicle.capacity")
      .isInt({ min: 1 })
      .withMessage("capacity must be at least 1 "),

    body("vehicle.vehicleType")
      .isLength(["car", "motorcycle", "auto"])
      .withMessage("invalid capacity"),
  ],
  captainController.registerCaption
);
module.exports = router;
