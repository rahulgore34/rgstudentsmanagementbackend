const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require('path');

const studentRouter = require("./routes/students-routes");
const adminRouter = require('./routes/admin-routes');

const organizeRouter = require('./routes/organizemeusers-routes');

// const AdminModel = require("../models/admin-model");
const app = express();
// midle ware for static file
// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors())
//middle ware
const custumMidlewareLogger = function(req, res, next) {
    console.log("Custum Middle ware...");
    next()
}

app.use(express.json()) //middleware to add  req body
app.use(custumMidlewareLogger); //middleware

// Middleware
// app.use((req, res, next)=> {
//     req.requestedAt = new Date().toISOString()
//     next();
// })



if(process.env.NODE_ENV === 'development') {
    app.use(morgan("dev")); //third party middleware
}

app.use("/api/v1/students",studentRouter);

app.use("/api/v1/administrator", adminRouter);

app.use("/api/v1/organizemeusers", organizeRouter);



// In order to use app in other file
module.exports = app;