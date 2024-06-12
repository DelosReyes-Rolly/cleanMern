import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import cors from 'cors';
import axios from 'axios';
import querystring from 'querystring';

const app = express();

const client_id = '6b31feeaaaa04c539545cc62a5f20fde';

const client_secret = 'f304b722429d4fb2bc83e4408c941b24';

app.use(express.json());

app.use(cors());

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome');
})


mongoose.connect(mongoDBURL).then(() => {
    console.log('App connected to the database.');
    app.listen(PORT, () => {
        console.log(`App is listening to port: ${PORT}`)
    });
}).catch((error) => {
    console.log(error);
})

// Function to get access token
const getAccessToken = async () => {
    const token_url = 'https://accounts.spotify.com/api/token';
    const response = await axios.post(token_url, querystring.stringify({
        grant_type: 'client_credentials'
    }), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64')
        }
    });
    return response.data.access_token;
};


// Fetch albums based on search query
app.get('/api/search/albums', async (req, res) => {
    try {
        const token = await getAccessToken();
        const query = req.query.q || 'best albums';
        const search_url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=album&limit=20`;

        const searchResponse = await axios.get(search_url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        res.json(searchResponse.data.albums.items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Function to get detailed track data
const getTrackDetails = async (trackIds, token) => {
    const track_url = `https://api.spotify.com/v1/tracks?ids=${trackIds.join(',')}`;
    const response = await axios.get(track_url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data.tracks;
};


app.get('/api/album/:id', async (req, res) => {
    try {
        const token = await getAccessToken();
        const album_id = req.params.id;
        const album_url = `https://api.spotify.com/v1/albums/${album_id}`;

        const albumResponse = await axios.get(album_url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const albumData = albumResponse.data;
        const trackIds = albumData.tracks.items.map(track => track.id);
        const trackDetails = await getTrackDetails(trackIds, token);

        res.json({
            album: albumData,
            tracks: trackDetails
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});