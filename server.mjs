import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3001;

dotenv.config();

// CORS Middleware
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());

// GET ALL OWNED GAMES 
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
        res.status(500).json({ error: 'Failed to fetch game data from Steam API' });
    }
});

// GET ACHIEVEMENT STATS WITH ID
app.get('/api/steam/achievements/:appId', async (req, res) => {
    const steamId = process.env.STEAM_ID;
    const apiKey = process.env.STEAM_API_KEY;
    const steamBaseUrl = 'http://api.steampowered.com';
    const { appId } = req.params;

    try {
        const response = await fetch(`${steamBaseUrl}/ISteamUserStats/GetPlayerAchievements/v0001/?appid=${appId}&key=${apiKey}&steamid=${steamId}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching Steam API:', error);
        res.status(500).json({ error: 'Failed to fetch achievements data from Steam API' });
    }
});

// DEV LOG
app.listen(port, () => {
    console.log(`Server running!`);
});