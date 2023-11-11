const express = require("express");
const fetch = require("node-fetch");
const { response } = require("express");
const app = express();
const port = 8000;
var cors = require("cors");
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.set("json spaces", 2);

// to query, call: http://localhost:8000/gettoken

var APIToken;
async function getToken() {
  let appId = "v7udsaema2";
  let hashToken =
    "djd1ZHNhZW1hMnxoY0NDYTZrR2JJOE1vNVg0MW4xOThxb1o5ZWR6QjF5NllpaWRGNkww";
  let url = `https://api.iq.inrix.com/auth/v1/appToken?appId=${appId}&hashToken=${hashToken}`;
  var requestOptions = {
    method: "GET",
  };
  //Query INRIX for token
  let response = await fetch(url, requestOptions);
  let json = await response.json();
  let output = json.result.token;

  return output;
}

//Starting server using listen function
app.listen(port, async function () {
  console.log("Server has been started at " + port);
  APIToken = await getToken();
});

app.get("/findRoute", async function (req, res) {
  let address1 = req.query.loc1; // reset to req.body.address
  let address2 = req.query.loc2;
  var requestOptions2 = {
    method: "GET",
    redirect: "follow",
  };

  var lat1;
  var long1;
  var lat2;
  var long2;
  let address1APIresponse = await fetch(
    "http://api.positionstack.com/v1/forward?access_key=4e3d941539b6f2b16a148d4092602345&query=" +
      address1,
    requestOptions2
  );
  let add1result = await address1APIresponse.json();

  lat1 = add1result.data[0].latitude;
  long1 = add1result.data[0].longitude;
  //Set up URL to query

  let address2APIresponse = await fetch(
    "http://api.positionstack.com/v1/forward?access_key=4e3d941539b6f2b16a148d4092602345&query=" +
      address2,
    requestOptions2
  );
  let add2result = await address2APIresponse.json();

  lat2 = add2result.data[0].latitude;
  long2 = add2result.data[0].longitude;

  let url = `https://api.iq.inrix.com/findRoute?wp_1=${lat1}%2C${long1}&wp_2=${lat2}%2C${long2}&maxAlternates=2&format=json`;
  //Set up query method

  var requestOptions = {
    method: "GET",
    headers: { Authorization: "Bearer " + theToken },
    redirect: "follow",
  };

  //Query INRIX for token
  let response = await fetch(url, requestOptions);
  let json = await response.json();
  await wait(1001);
  let output = json.result;
  let r1 = await getRouteGeography(output.trip.routes[0]);
  await wait(1001);
  let r2 = await getRouteGeography(output.trip.routes[1]);
  await wait(1001);
  let r3 = await getRouteGeography(output.trip.routes[2]);
  res.json({
    //route1: await getRouteGeography(output.trip.routes[0]),
    route1: r1,
    route2: r2,
    route3: r3,
    //route2: await getRouteGeography(output.trip.routes[1]),
    //route3: await getRouteGeography(output.trip.routes[2]),
  });
});

function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
