const express = require('express');
const router = express.Router();


router.get("/test", async (req, res) => {
    res.json({ text: "works" });
});

function computeRadius(latTL, lngTL, latBR, lngBR) {

    // Calculates the midpoint of given points
    const midLat = (latTL + latBR) / 2;
    const midLng = (lngTL + lngBR) / 2;

    // Calculates the distance (radius) from midpoint to point
    return Math.sqrt(Math.pow(latBR - midLat, 2) + Math.pow(lngBR - midLng, 2));

}


router.get("/:latTL/:lngTL/:latBR/:lngBR", async (req, res) => {
    const latTL = parseFloat(req.params.latTL);
    const lngTL = parseFloat(req.params.lngTL);
    const latBR = parseFloat(req.params.latBR);
    const lngBR = parseFloat(req.params.lngBR);

    const radius = computeRadius(latTL, lngTL, latBR, lngBR);
    const API_token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkZTF3MW9obTRpZGF3eTg2dW1sb3h5NXhxbmJ6a24xdSIsImlzcyI6ImRhdGFmaW5pdGkuY28ifQ.O69Zn_Uks_ZVMBC1to60wRhQZgaU4Tf7BrfJ0I7o4pBlUt9XZ9SHq1s5SVUJbjhXrLtdLRH6SDAyy2OTBAjKKg3uyxj1QTuwPHDSVO6RH0bUZbwrsASvrmojsbunkYaKMZWTzEI6lrD_5AnW6kz8s9X8P2Ang7m7IEiJiZmRHK1LRVN6T7RkUvIb4_HyiotdwmvTTcuxCicLnhwJIeVzSyxgiZllRInFsY2QJ0r6ljdL7oNPFFcsSeYVIp32MrmY2WwW0OP5Xeb552QTuyKTALC3W0v49cFvA_tW2UGo6ofNwzqa7d_OfOI6cmjymVeXzyPD0gxB6Uygq5EO-n3NfLys-CpKwEAoD2NYISMkZr7cTZPSlVy7DBVepuvuMnvE0fuhVDVDdHWyxP40pGZT32BOjpz97lVc9Gb--H0ZezImdFEbXtQ0NGH_2qzP613XYMiAtjj6wNhSvzyMTfqWX1OaYnYvD2JtJlIslMfZy0alkUsbiTOCUpBv3YrIKF2UaDRv04khWosaL74ewSuzCVu8ZXr_C1rO5u7pLTyM2sdAA_jjtJlpGQShyYtIU3BZUJ6JtMHIQkrA56_RxTQgPvZBbB-22qdxLq_ap5PQl_qHx0NFY41nYPDEhV8EzBdz4bSKHgb_0MFt4Ao0GtV2MsXk6QSWVpxk8EZ-jX31BfA';
    const format = 'JSON';
    const midLat = (latTL + latBR) / 2;
    const midLng = (lngTL + lngBR) / 2;
    const query = 'geoLocation:[' + midLng + ',' + midLat + ',' + 10 + ',km] AND propertyType:"Retail" AND mostRecentStatus="For Sale"';
    const num_records = 50;
    const download = false;


    const url = 'https://api.datafiniti.co/v4/properties/search';

    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + API_token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'query': query,
            'format': format,
            'num_records': num_records,
            'download': download
        })
    };

    //console.log(requestOptions);

    try {
        const response = await fetch(url, requestOptions);
        const data = await response.text();
        const parsedData = JSON.parse(data);
        //console.log(parsedData);
        //console.log(parsedData["num_found"]);

        const result = parsedData.records.map((record) => ({
            latitude: record.latitude,
            longitude: record.longitude,
            price: record.mostRecentPriceAmount,
            address: record.address
        }));

        //console.log(result);
        res.json(result);

    } catch (error) {
        console.error(error);
    }

});

module.exports = router;
