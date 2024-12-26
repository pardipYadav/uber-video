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
