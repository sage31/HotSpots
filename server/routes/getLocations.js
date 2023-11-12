const express = require('express');
const { Client } = require('@googlemaps/google-maps-services-js');
const router = express.Router();

// Create a new instance of the Google Maps client
const client = new Client({});

router.get("/:query/:latTL/:lngTL/:latBR/:lngBR", async (req, res) => {
    try {
        const latTL = parseFloat(req.params.latTL);
        const lngTL = parseFloat(req.params.lngTL);
        const latBR = parseFloat(req.params.latBR);
        const lngBR = parseFloat(req.params.lngBR);

        // Calculate the midpoint
        const midLat = (latTL + latBR) / 2;
        const midLng = (lngTL + lngBR) / 2;

        // Calculate the distance (radius) - simplistic approach
        const radius = Math.sqrt(Math.pow(latBR - midLat, 2) + Math.pow(lngBR - midLng, 2)) * 1000; // Convert to meters

        const response = await client.textSearch({
            params: {
                query: req.params.query,
                location: { lat: midLat, lng: midLng },
                radius: radius,
                key: 'AIzaSyDDh5-81gvbR0DtxHa5Q8ss2-qnq34PGmg' // Replace with your actual API key
            },
            timeout: 1000 // Optional timeout in milliseconds
        });

        const locations = response.data.results.map(place => ({
            latitude: place.geometry.location.lat,
            longitude: place.geometry.location.lng
        }));

        res.json(locations);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

module.exports = router;
