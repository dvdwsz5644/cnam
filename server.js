require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Allow CORS for all origins
app.use(cors({
    origin: "https://cnam-1.onrender.com", // Change this to your frontend URL in production (e.g., "https://yourdomain.com")
    methods: "GET",
    allowedHeaders: ["Authorization", "Content-Type"]
}));

// Load credentials from .env file
const API_USERNAME = process.env.API_USERNAME;
const API_PASSWORD = process.env.API_PASSWORD;
const BASE_URL = "https://webserv.telebroad.com/api/teleconsole/rest/cnam?number=";

// Secure Endpoint for Caller ID Lookup
app.get('/lookup', async (req, res) => {
    const number = req.query.number;

    if (!number) {
        return res.status(400).json({ error: "Phone number is required." });
    }

    try {
        const response = await axios.get(`${BASE_URL}${number}`, {
            headers: {
                Authorization: `Basic ${Buffer.from(`${API_USERNAME}:${API_PASSWORD}`).toString('base64')}`
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error("API Request Failed:", error.message);
        res.status(error.response?.status || 500).json({ error: "Failed to fetch caller ID." });
    }
});

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
