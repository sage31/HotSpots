const express = require('express');
const app = express();

const locationsRoute=require('./routes/getLocations');

app.get("/api", (req, res) => {
  res.json({key1: "Hi"});
});

app.get("/", (req, res) => {
  res.json({text: "API WORKING!!"})
});

app.use('/get-locations',locationsRoute);

module.exports = app;