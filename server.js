require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Allow CORS for all origins
const corsOptions = {
    origin: ["https://cnamtb.netlify.app", "https://cnam-1.onrender.com"], // Allow both frontend and API
    methods: "GET",
    allowedHeaders: ["Authorization", "Content-Type"]
};

app.use(cors(corsOptions));


console.log("API_USERNAME:", process.env.API_USERNAME);
console.log("API_PASSWORD:", process.env.API_PASSWORD ? "Loaded" : "Not Loaded");

const authHeader = `Basic ${Buffer.from(`${API_USERNAME}:${API_PASSWORD}`).toString('base64')}`;

const response = await axios.get(`${BASE_URL}${number}`, {
    headers: { Authorization: authHeader }
});

// Load credentials from .env file
const API_USERNAME = process.env.API_USERNAME;
const API_PASSWORD = process.env.API_PASSWORD;
const BASE_URL = "https://webserv.telebroad.com/api/teleconsole/rest/cnam?number=";


console.log("Auth Header:", authHeader);


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
