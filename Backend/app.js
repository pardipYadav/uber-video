const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();
const connectedDB = require("../Backend/db/db");
connectedDB();
app.use(cors());
app.get("/", (req, res) => {
  res.send("hello world");
});

module.exports = app;
