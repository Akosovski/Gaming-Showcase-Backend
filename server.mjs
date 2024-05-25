import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3001;

dotenv.config();

// Set up CORS middleware
const corsOptions = {
    origin: '*', // Replace '*' with your allowed origin(s)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/api/steam/games', async (req, res) => {
    const steamId = process.env.STEAM_ID;
    const apiKey = process.env.STEAM_API_KEY;
    const steamBaseUrl = 'http://api.steampowered.com';

    try {
        const response = await fetch(`${steamBaseUrl}/IPlayerService/GetOwnedGames/v0001/?key=${apiKey}&steamid=${steamId}&format=json`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching Steam API:', error);
        res.status(500).json({ error: 'Failed to fetch data from Steam API' });
    }
});

// DEV LOG
app.listen(port, () => {
    console.log(`Server running!`);
});
