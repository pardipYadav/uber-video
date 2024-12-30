const blacklistTokenModel = require("../models/blacklistToken.model");
const captainModel = require("../models/captain.model");
const captainServices = require("../services/captain.service");
const { validationResult } = require("express-validator");
module.exports.registerCaption = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  const { fullname, email, password, vehicle } = req.body;
  const isEmailAlreadyExists = await captainModel.findOne({ email });
  if (isEmailAlreadyExists) {
    return res.status(201).json({ message: "captain is already exist" });
  }
  const hashedPassword = await captainModel.hashPassword(password);
  const captian = await captainServices.createCaptain({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType,
  });
  const token = captian.generateAuthToken();

  res.status(201).json({ token, captian });
};

module.exports.loginCaptain = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  const { email, password } = req.body;
  const captain = await captainModel.findOne({ email }).select("+password");
  if (!captain) {
    return res.status(401).json({ message: "invalid email or password" });
  }

  const isMatch = await captain.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "invalid email or password" });
  }
  const token = captain.generateAuthToken();

  res.cookie("token", token);
  res.status(200).json({ token, captain });
};

module.exports.getCaptainProfile = async (req, res, next) => {
  res.status(200).json({ captain: req.captain });
};

module.exports.logoutCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authrization?.slip(" ")[1];
  await blacklistTokenModel.create({ token });
  res.clearCookie("token");
  res.status(200).json({ message: "logout successfully" });
};
