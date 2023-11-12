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
                //onst polygons = JSON.parse(data.trim()); // Parse the JSON string
                
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
    return 50;
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

function initializeComposite(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject('Error reading file: ' + err);
                return;
            }

            try {
                // Ensure data is in the correct format for JSON parsing
                const polygons = JSON.parse(data.trim());
                let union;

                polygons.forEach(polygonString => {
                    const polygon = {
                        type: "Feature",
                        geometry: parsePolygonString(polygonString)
                    };

                    if (!union) {
                        union = polygon;
                    } else {
                        union = turf.union(union, polygon);
                    }
                });

                if (union) {
                    const totalArea = geojsonArea.geometry(union.geometry);
                    
                    // Writing to initcomposite.txt
                    const unionVertices = union.geometry.coordinates;
                    const content = `Vertices: ${JSON.stringify(unionVertices)}\nArea: ${totalArea}`;
                    fs.writeFile('initcomposite.txt', content, 'utf8', writeErr => {
                        if (writeErr) {
                            reject('Error writing to file: ' + writeErr);
                        } else {
                            resolve(totalArea);
                        }
                    });
                } else {
                    reject('No polygons to calculate area');
                }
            } catch (Error) {
                reject('Error parsing asdfJSON: ' + Error);
            }
        });
    });
}

async function getAvailableRealEstate(latTL, lngTL,latBR, lngBR) {
    const url = `http://localhost:8000/get-properties/${latTL}/${lngTL}/${latBR}/${lngBR}`;
    // Replace the above URL with your actual endpoint and query parameters

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        
        return data;
    } catch (error) {
        console.error("Error fetching data: ", error);
        return [];
    }
}


router.get("/:latTL/:lngTL/:latBR/:lngBR", async (req, res) => {
    const filePath = "./initpoly.txt";
    console.log("hereee");

    // Assuming getAvailableRealEstate returns an array of coordinates
    const realestate = await getAvailableRealEstate(req.params.latTL, req.params.lngTL, req.params.latBR, req.params.lngBR);

    // Initialize an array to store the top three coordinates
    const topThreeCoordinates = [];

    for (const coord of realestate) {
        const score = getScore(coord.latitude, coord.longitude);
        // Store the coordinates with the three highest scores
        // Adjust the comparison logic as needed
        if (topThreeCoordinates.length < 3 || score > topThreeCoordinates[2].score) {
            topThreeCoordinates.push({ latitude: coord.latitude, longitude: coord.longitude, score });
            // Sort the array based on scores in descending order
            topThreeCoordinates.sort((a, b) => b.score - a.score);
            // Keep only the top three coordinates
            topThreeCoordinates.splice(3);
        }
    }

    // Send the top three coordinates as the response
    res.json({ success: true, topThreeCoordinates });
});

module.exports = router;
