"use strict";

var express = require("express");
var app = express();
var _require = require("path"),
  resolve = _require.resolve;

// Replace if using a different env file or config
var env = require("dotenv").config({
  path: "./.env"
});
var PORT = process.env.PORT || 8080;
app.use(express["static"](process.env.STATIC_DIR));
app.get("/", function (req, res) {
  var path = resolve(process.env.STATIC_DIR + "pages/index.html");
  res.sendFile(path);
});
app.listen(PORT, function () {
  return console.log("Node server listening at http://localhost:".concat(PORT));
});
