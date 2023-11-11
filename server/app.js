const express = require('express');

const app = express();

app.get("/api", (req, res) => {
  res.json({key1: "Hi"});
});

app.get("/", (req, res) => {
  res.json({text: "API WORKING!!"})
});

module.exports = app;