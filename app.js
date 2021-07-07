const express = require("express");
const app = express();
const xXssProtection = require("x-xss-protection");
var routes = require("./app/routes/user");
const PORT = process.env.PORT || 8080
//var route = require("./app/routes/index");
var fs = require("fs");
app.use(express.json())

app.use(function (req, res, next) {
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use(xXssProtection());
app.use("/", express.static("./app/"));
app.use("/", routes);
//app.use("/img", route);


app.listen(PORT, () => {
  console.log("Server is running..");
});