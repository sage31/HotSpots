const express = require('express');
const router = express.Router();
const turf = require('turf');
const geojsonArea = require('geojson-area');

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

function calculateNetArea(polygons) {
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

    const totalArea = geojsonArea.geometry(union.geometry);

    return totalArea;
}



router.get("/", async (req, res) => {

    
});

module.exports = router;
