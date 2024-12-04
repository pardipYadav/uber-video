const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userControler = require("../controllers/user.controllers");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invelid email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("fist must be greater 3 character"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be greater then 6 character"),
  ],
  userControler.registerUser
);

module.exports = router;
