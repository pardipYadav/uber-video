const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userControler = require("../controllers/user.controllers");
const authMiddleWare = require("../middlewares/auth.middleware");

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

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invelid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("password must greater then 6 characters"),
  ],
  userControler.loginUser
);

router.get("/profile", authMiddleWare.authUser, userControler.getUserProfile);
router.get("/logout",authMiddleWare.authUser,userControler.logoutUser);

module.exports = router;
