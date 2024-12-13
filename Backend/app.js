const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const connectedDB = require("../Backend/db/db");
const userRoutes = require("../Backend/routes/user.routes");
connectedDB();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/users", userRoutes);

module.exports = app;
