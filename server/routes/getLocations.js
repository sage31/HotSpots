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


        // Calculates the midpoint of given points
        const midLat = (latTL + latBR) / 2;
        const midLng = (lngTL + lngBR) / 2;

        // Calculates the distance (radius) from midpoint to point
        const radius = Math.sqrt(Math.pow(latBR - midLat, 2) + Math.pow(lngBR - midLng, 2)) * 1000; 

        const response = await client.textSearch({ //google API which gets locations that fall under query, within radius
            params: {
                query: req.params.query,
                location: { lat: midLat, lng: midLng }, //center will be location
                radius: radius, 
                key: 'AIzaSyDDh5-81gvbR0DtxHa5Q8ss2-qnq34PGmg' 
            },
            timeout: 1000 // Optional timeout in milliseconds
        });
        
        const locations = response.data.results.map(place => ({ //latlng data with no filter
            latitude: place.geometry.location.lat,
            longitude: place.geometry.location.lng
        }));
        
       /*
        const locations = response.data.results //capture latitude and longitude only
            .filter(place => place.name.toLowerCase() === req.params.query.toLowerCase()) //filter out unintentional locations
            .map(place => ({
                latitude: place.geometry.location.lat,
                longitude: place.geometry.location.lng
            }));
        */
        //res.json(response.data);
        res.json(locations);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

module.exports = router;
