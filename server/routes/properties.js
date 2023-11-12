const express = require('express');
const router = express.Router();


router.get("/test", async (req, res) => {
    res.json({ text: "works" });
});


router.get("/", async (req, res) => {
    const API_token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJvMTY3Y3VhMDZ6cmZ4bjE1d3A3dWhkdWFzZmtoMTNvdiIsImlzcyI6ImRhdGFmaW5pdGkuY28ifQ.XT2FdIAPFV7cP0ylIipd7D3LomjCKzexBNSA2OaMnjCku1zm2qBKfkuwB8LwHHZXf99SRthJuBce3Ozel0uLtdcN7NNvvVonhqLMLd3pZl7rLi6CNGZVK22U-yny7eEk_9fbee1ljhCz_OUyFIYSqk9-VOuwmpAHAKSFW7gvvQiUIeZBlk9-Qo2yA2Ho-wUN5xIn2Rs6MlPlgY1zD8zSo-JriLH8zeN9N5_-ECeOAVYdigVNQXm6YXb9tNqlElSD737oFmr0gBxPwn019tbpwLqpt_l8_D61VMJowdsY0dTrxEE0h741VrpcSX5sHLQff0KL5uZ4tlzhg2mGkYa4f85Gbg3bU0x9bmF9rr-fnQAb9FNI7XZqjHzOxSbO7C-mGLxwErBmQ6YIxNhJ2a7jEXlwfk_uPmZWDkyBF5cmk5SUPZ625kO8eYD0Y19d3xbEkayNsbHVWKR98VT4sxuS1ZWeF6l_p262vnTJNuObxf0GCMP02Ac6vNrtglZr8ylgWtzkKtUnRskw9e3InFHfyXZfBrD21jvIL0gbuDQjRl6n0YZR30_pIixDo3zr7BzCaoZ4baiz4OLujJk2Ap2LBdZqHckM0J4ByQoo74pbMblRu0_ffD8-JUNQwyW4BVMuZyBmPlFAlzQqrC5FBAxw8jxwlMqWHAEtRXs-nPyBon0'; // Your Datafiniti API token
    const format = 'JSON';
    const lat = "37.770315";
    const lon = "-122.446527";
    const query = 'geoLocation:[' + lon + ',' + lat + ',30,km] AND propertyType:"Retail" AND mostRecentStatus="For Sale"';
    const num_records = 2;
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

    console.log(requestOptions);

    try {
        const response = await fetch(url, requestOptions);
        const data = await response.text();
        const parsedData = JSON.parse(data);
        console.log(parsedData);
        console.log(parsedData["num_found"]);
        

    } catch (error) {
        console.error(error);
    }

    res.json({ message: "API call initiated" });
});

module.exports = router;
