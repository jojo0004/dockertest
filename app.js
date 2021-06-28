const express = require("express");
const app = express();
const xXssProtection = require("x-xss-protection");
var routes = require("./app/routes/user");
var fs = require("fs");


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



app.listen(91, () => {
  console.log("Server is running..");
});