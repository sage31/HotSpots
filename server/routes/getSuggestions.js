const express = require('express');
const router = express.Router();
const turf = require('turf');
const geojsonArea = require('geojson-area');

function calculateNetArea(geoJsonPolygons) {
    let union;
    geoJsonPolygons.features.forEach(polygon => {
        if (!union) {
            union = polygon;
        } else {
            union = turf.union(union, polygon);
        }
    });
    // Calculate the total area
    const totalArea = geojsonArea.geometry(union.geometry);

    return totalArea;
}



router.get("/", async (req, res) => {

    
});

module.exports = router;
