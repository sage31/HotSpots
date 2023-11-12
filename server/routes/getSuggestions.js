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


async function generatePolygonsForLocations(range) {
    for (const location of locations) {
        try {
            const response = await fetch(`http://localhost:8000/generate-polygon/${location.latitude}/${location.longitude}/${range}/yes`);
            if (!response.ok) {
                throw new Error(`API call failed: ${response.status}`);
            }
            const polygonData = await response.json();
            console.log(polygonData); // Process the data as needed
        } catch (error) {
            console.error('Error:', error);
        }
    }
}

/*
function classifyCoverage(lat1, lng1, lat2, lng2) {
    // Create a GeoJSON polygon
    const polygon = turf.polygon([[
        [lng1, lat2], // Bottom-left
        [lng1, lat1], // Top-left
        [lng2, lat1], // Top-right
        [lng2, lat2], // Bottom-right
        [lng1, lat1]  // Closing the polygon
    ]]);

    // Calculate the area in square meters
    const totalArea = geojsonArea.geometry(polygon.geometry);

    generatePolygonsForLocations(5)
        .then(() => {
            const netArea = calculateNetAreaFromFile('./initpoly.txt');
        })
        .catch(error => {
            console.error('Error:', error);
        });
    
        if(netArea/totalArea>0.5){
            return 1;
        }
        else{
            generatePolygonsForLocations(locations,10)
            .then(() => {
                const netArea = calculateNetAreaFromFile('./initpoly.txt');
            })
            .catch(error => {
                console.error('Error:', error);
            });
        
            if(netArea/totalArea>0.5){
                return 2;
            }
            else{
                return 3
            }
        }


}
*/



router.get("/", async (req, res) => {
    const filePath = './initpoly.txt'; // Adjust the path as needed

    try {
        const totalArea = await calculateNetAreaFromFile(filePath);

        res.json({ success: true, totalArea: totalArea });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error });
    }
});
module.exports = router;
