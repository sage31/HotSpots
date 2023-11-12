const express = require('express');
const router = express.Router();
const turf = require('turf');
const geojsonArea = require('geojson-area');
const fs = require('fs');


function parsePolygonString(polygonString) {
    const coordinates = polygonString.split(" ").map((val, index, array) => {
        if (index % 2 === 0) {
            return [parseFloat(array[index + 1]), parseFloat(val)];
        }
        return null;
    }).filter(val => val);
    
    return {
        type: "Polygon",
        coordinates: [coordinates]
    };
}

function calculateNetAreaFromFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject('Error reading file: ' + err);
                return;
            }

            try {
                const polygons = JSON.parse(data.trim()); // Parse the JSON string
                let union;

                polygons.forEach(polygonString => {
                    const polygon = {
                        type: "Feature",
                        geometry: parsePolygonString(polygonString)
                    };

                    //console.log("Parsed Polygon:", JSON.stringify(polygon, null, 2)); // Improved logging

                    if (!union) {
                        union = polygon;
                    } else {
                        union = turf.union(union, polygon);
                    }
                });

                if (union) {
                    //console.log("Union of polygons:", JSON.stringify(union.geometry, null, 2)); // Improved logging
                    const totalArea = geojsonArea.geometry(union.geometry);
                    resolve(totalArea);
                } else {
                    reject('No polygons to calculate area');
                }
            } catch (jsonParseError) {
                reject('Error parsing JSON: ' + jsonParseError);
            }
        });
    });
}

function getOffStreetSpotsCount(lat, lon, radius) {
    const apiUrl = `http://localhost:8000/number-off-street/${lat}/${lon}/${radius}`;

    return fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => data.spots) // Adjust this based on the actual structure of the returned JSON
        .catch(error => {
            console.error('Error fetching off-street parking spots:', error);
            return 0; // Return a default value or handle the error as needed
        });
}

function getOnStreetSpotsCount(lat, lon, radius) {
    const apiUrl = `http://localhost:8000/number-on-street/${lat}/${lon}/${radius}`;

    return fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => data.spots) // Adjust this based on the actual structure of the returned JSON
        .catch(error => {
            console.error('Error fetching on-street parking spots:', error);
            return 0; // Return a default value or handle the error as needed
        });
}

function getScore(lat, lng){
    //read in union polygon from initcomposite.txt
    polygon = 

    //read in old area from initcomposite.txt
    oldArea = 

    union = turf.union(union, polygon);
    newArea = geojsonArea.geometry(union.geometry);

    changeInArea = newArea - oldArea;

    //radius of parking lots within 350 meters
    parkingRadius = 350;
    offStreetSpots = getOffStreetSpotsCount(lat, lng, radius)
    onStreetSpots = getOnStreetSpotsCount(lat, lng, radius)
    totalParking = offStreetSpots + onStreetSpotsl;

    coverageWeight = .5;
    parkingWeight = .8;

    return coverageWeight*changeInArea + parkingWeight*totalParking;
}

router.get("/", async (req, res) => {
    
    // const filePath = './initpoly.txt'; // Adjust the path as needed

    // try {
    //     const totalArea = await calculateNetAreaFromFile(filePath);

    //     res.json({ success: true, totalArea: totalArea });
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ success: false, error: error });
    // }
});

module.exports = router;
