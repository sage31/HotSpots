const express = require('express');
const { Client } = require('@googlemaps/google-maps-services-js');
const router = express.Router();

// Create a new instance of the Google Maps client
const client = new Client({});

router.get("/:query", async (req, res) => {
    try {
        const response = await client.findPlaceFromText({
            params: {
                input: req.params.query,
                inputtype: 'textquery',
                key: 'AIzaSyDDh5-81gvbR0DtxHa5Q8ss2-qnq34PGmg', 
                // You can add additional parameters here as needed
            },
            timeout: 1000 // Optional, specify a timeout in milliseconds
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

module.exports = router;
