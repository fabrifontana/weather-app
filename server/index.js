const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/api/weather', async (req, res) => {
    const {city} = req.query;
    const apiKey = process.env.API_KEY;

    try {
        const response = await fetch(
            `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`
        );

        if (!response.ok) {
            console.error('Error fetching weather data:', response.statusText);
            return res.status(response.status).json({ error: 'Failed to fetch weather data' });
        }

        const data = await response.json();
        return res.json(data);

    } catch (error) {
        console.error('Error fetching weather data:', error);
        return res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});