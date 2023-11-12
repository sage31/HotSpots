const express = require('express');
const app = express();
const { parseString } = require('xml2js');


const locationsRoute=require('./routes/getLocations');

const suggestionsRoute=require('./routes/getSuggestions');

const propertiesRoute = require('./routes/properties');

app.get("/api", (req, res) => {
  res.json({
    key1: "Hi",
    key2: "Second bit"
  });
});

app.get("/", (req, res) => {
  res.json({ text: "API WORKING!!" })
});


app.use('/get-locations',locationsRoute);

app.use('/get-suggestions',suggestionsRoute);


app.use('/get-properties', propertiesRoute);

function xmlToJson(xmlString) {
  let result = null;
  parseString(xmlString, (err, res) => {
    if (!err) {
      result = res;
    }
  });
  return result;
}

app.get('/generate-polygon/:lat/:lon/:range/:existing', async (req, res) => {
  try {
    const inrixUrl = "https://api.iq.inrix.com/drivetimePolygons";
    const { lat, lon, range, existing } = req.params;

    // Obtain the token using the getToken function
    const token = await getToken();

    const center = `${lat}|${lon}`;

    const queryParams = {
      center: center,
      rangeType: 'A',
      duration: range
    };

    const queryString = new URLSearchParams(queryParams).toString();

    const apiUrl = `${inrixUrl}?${queryString}`;

    // You can now use the apiUrl to make the request to the Inrix API
    // Include the token in the Authorization header
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/xml',
        'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data from Inrix API: ${response.status} ${response.statusText}`);
    }

    const xmlData = await response.text();
    const jsonData = xmlToJson(xmlData);
    const newPolygon = jsonData.Inrix.Polygons[0].DriveTime[0].Polygon[0].exterior[0].LinearRing[0].posList;

    // console.log(jsonData.Inrix.Polygons[0].DriveTime[0].Polygon[0].exterior[0].LinearRing[0].posList);
    if(existing == "yes"){
      const filePath = 'server/initpoly.txt'; // Specify the path to your text file
        fs.appendFile(filePath, JSON.stringify(newPolygon) + '\n', (err) => {
            if (err) {
                console.error('Error writing to file:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    
    res.json(newPolygon);

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

async function getToken() {
  let appId = "v7udsaema2";
  let hashToken = "djd1ZHNhZW1hMnxoY0NDYTZrR2JJOE1vNVg0MW4xOThxb1o5ZWR6QjF5NllpaWRGNkww";
  let url = `https://api.iq.inrix.com/auth/v1/appToken?appId=${appId}&hashToken=${hashToken}`;

  var requestOptions = {
    method: 'GET'
  };

  let response = await fetch(url, requestOptions);
  let json = await response.json();

  return json.result.token;
}

// Endpoint to get the token
app.get('/gettoken', async function (req, res) {
  try {
    let token = await getToken();
    res.json({ token: token });
  } catch (error) {
    console.error('Error fetching token:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = app;