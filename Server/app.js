const express = require('express');
const axios = require('axios');
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3007;

app.use(cors());
const apiKeyVal = process.env.API_KEY;

app.get('/weather/:cityName', async (req, res) => {
    try {
        const apiKey = apiKeyVal;
        const units = 'metric';
        const cityName = req.params.cityName;
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}&appid=${apiKey}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
});


app.listen(port, () => {
    console.log(`Server listening to: ${port}`);
});
