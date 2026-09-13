const express = require("express");
require("dotenv").config()
const { ConnectedToDb } = require("./config/database");

ConnectedToDb();

const app = express();

module.exports = app;