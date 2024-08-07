import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import router from "./routes/AuthRoute.js";
import { PORT, mongoDBURL, client_id, client_secret } from "./config.js";
import mongoose from "mongoose";
import cors from 'cors';
import axios from 'axios';
import querystring from 'querystring';
import NodeCache from "node-cache";
import { User } from "./models/UserModel.js";
import { Review } from "./models/ReviewModel.js";
import usersRoute from './routes/usersRoute.js';
const app = express();

const corsOptions = {
  origin: "https://music-review-v1.onrender.com", // frontend URI (ReactJS)
}

app.use(express.json());
app.use(cors(corsOptions));

// Initialize cache
const tokenCache = new NodeCache({ stdTTL: 3600 });
const genresCache = new NodeCache({ stdTTL: 3600 });

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

// Middleware Configuration
// Body-parser to parse incoming request bodies as JSON
app.use(bodyParser.json());
// Cookie-parser for handling cookies
app.use(cookieParser());
// Routing
// Mounting authentication-related routes under the '/api' endpoint
app.use("/api", router);

// Function to get access token with caching
const getAccessToken = async () => {
  let token = tokenCache.get('accessToken');
  if (token) {
    return token;
  }

  const token_url = 'https://accounts.spotify.com/api/token';
  const response = await axios.post(token_url, querystring.stringify({
    grant_type: 'client_credentials'
  }), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64')
    }
  });

  token = response.data.access_token;
  tokenCache.set('accessToken', token);
  return token;
};


// Fetch podcasts based on search query
app.get('/api/podcasts', async (req, res) => {
  try {
    const token = await getAccessToken();
    const query = req.query.q || 'podcast';
    const search_url = `https://api.spotify.com/v1/search?query=${encodeURIComponent(query)}&type=show&market=PH&locale=en-US&limit=18`;

    const searchResponse = await axios.get(search_url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    res.json(searchResponse.data.shows.items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch artists based on search query
app.get('/api/artists', async (req, res) => {
  try {
    const token = await getAccessToken();
    const query = req.query.q || 'best singer';
    const search_url = `https://api.spotify.com/v1/search?query=${encodeURIComponent(query)}&type=artist&locale=en-US&limit=18`;

    const searchResponse = await axios.get(search_url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    res.json(searchResponse.data.artists.items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Fetch albums based on search query
app.get('/api/search/albums', async (req, res) => {
  try {
    const token = await getAccessToken();
    const query = req.query.q || 'best albums';
    const search_url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=album&limit=18`;

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


app.get('/api/genres', async (req, res) => {
  let genres = genresCache.get('genres');
  if (genres) {
    return res.json(genres);
  }

  try {
    const token = await getAccessToken();
    const genres_url = 'https://api.spotify.com/v1/recommendations/available-genre-seeds';

    const genresResponse = await axios.get(genres_url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    genres = genresResponse.data.genres;
    genresCache.set('genres', genres);
    res.json(genres);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/albums/genre/:genre', async (req, res) => {
  try {
    const token = await getAccessToken();
    const genre = req.params.genre;
    const search_url = `https://api.spotify.com/v1/search?q=genre:${encodeURIComponent(genre)}&type=album&limit=18`;

    const fetchAlbums = async (retries = 3) => {
      try {
        const searchResponse = await axios.get(search_url, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        return searchResponse.data.albums.items;
      } catch (error) {
        if (retries > 0 && error.response && error.response.status === 429) {
          // Retry after the specified delay
          const retryAfter = error.response.headers['retry-after'] || 1;
          await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
          return fetchAlbums(retries - 1);
        } else {
          throw error;
        }
      }
    };

    const albums = await fetchAlbums();
    res.json(albums);
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
    const albumReviews = await getAlbumReviews(album_id);
    res.json({
      album: albumData,
      tracks: trackDetails,
      albumReviews: albumReviews,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// fetch artist details
app.get('/api/artist/:id', async (req, res) => {
  try {
    const token = await getAccessToken();
    const artist_id = req.params.id;
    const artist_url = `https://api.spotify.com/v1/artists/${artist_id}`;

    const artistResponse = await axios.get(artist_url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const artistData = artistResponse.data;

    res.json({
      artist: artistData,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// fetch artist albums
app.get('/api/artist/albums/:id', async (req, res) => {
  try {
    const token = await getAccessToken();
    const artist_id = req.params.id;
    const artistAlbums_url = `https://api.spotify.com/v1/artists/${artist_id}/albums?include_groups=album`;

    const artistAlbumsResponse = await axios.get(artistAlbums_url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const artistAlbumsData = artistAlbumsResponse.data;

    res.json({
      artistAlbums: artistAlbumsData,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// fetch artist singles
app.get('/api/artist/singles/:id', async (req, res) => {
  try {
    const token = await getAccessToken();
    const artist_id = req.params.id;
    const artistSingles_url = `https://api.spotify.com/v1/artists/${artist_id}/albums?include_groups=single`;

    const artistSinglesResponse = await axios.get(artistSingles_url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const artistSinglesData = artistSinglesResponse.data;

    res.json({
      artistSingles: artistSinglesData,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//fetch related artist to the artist
app.get('/api/artist/related/:id', async (req, res) => {
  try {
    const token = await getAccessToken();
    const artist_id = req.params.id;

    const artistRelated_url = `https://api.spotify.com/v1/artists/${artist_id}/related-artists`;

    const artistRelatedResponse = await axios.get(artistRelated_url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const artistRelatedData = artistRelatedResponse.data;

    res.json({
      artistRelated: artistRelatedData,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//fetch podcasts details
app.get('/api/podcasts/details/:id', async (req, res) => {
  try {
    const token = await getAccessToken();
    const podcast_id = req.params.id;
    const podcastDetails_url = `https://api.spotify.com/v1/shows/${podcast_id}`;

    const podcastDetailsResponse = await axios.get(podcastDetails_url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const podcastDetailsData = podcastDetailsResponse.data;

    res.json({
      podcastDetails: podcastDetailsData,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/edit/profile/:id', async (request, response) => {
  try {
    const { name } = request.body;
    if (!name) {
      return response.status(400).send({
        message: 'Send all the required fields.',
      });
    }

    const { id } = request.params;
    const data = { $set: { name } };

    // Assuming the ID is the MongoDB ObjectID
    const result = await User.findOneAndUpdate({ _id: id }, { $set: { name } });

    // Check if any document was matched and updated
    if (result.matchedCount === 0) {
      return response.status(404).send({ message: 'Account not found' });
    }

    return response.status(200).send({ message: 'Account updated' });
  } catch (error) {
    console.error(error);
    response.status(500).send({ message: error.message });
  }
});

app.post('/check/password/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const { password } = request.body

    console.log(id);
    console.log(password);

    //match the passwords and return success

    await User.findOne({ _id: `${id}` })
      .then(user => {
        if (!user) {
          return response.status(400).json({
            error: "User not found"
          });
        }
        if (!user.authenticate(password)) {
          return response.status(401).json({
            error: "Email or Password does not exist"
          });
        }
        return response.status(200).send({ message: 'User deleted' });
      });

  } catch (error) {
    console.log(error);
    response.status(500).send({ messsage: error.message });
  }
});

app.delete('/delete/profile/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await User.findByIdAndDelete(id, request.body);

    if (!result) {
      return response.status(404).send({ message: 'User not found' });
    }

    return response.status(200).send({ message: 'User deleted' });
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
});

app.post('/album/review/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const { userId, userName, title, description } = request.body;
    if (!title || !description) {
      return response.status(400).send({
        message: 'Send all the required fields.',
      });
    }

    const newReview = {
      user_id: userId,
      user: userName,
      album_id: id,
      title: title,
      description: description,
    };

    const review = await Review.create(newReview);

    return response.status(201).send(review);

  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
})

app.post('/album/comment/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const { userId, userName, commentOne } = request.body;
    if (!userId || !commentOne) {
      return response.status(400).send({
        message: 'Send all the required fields.',
      });
    }

    const newComment = {
      user_id: userId,
      user: userName,
      comment: commentOne,
    };

    const comments = await Review.updateOne({ _id: id }, { $push: { "comments": newComment } });

    return response.status(201).send(comments);

  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message })
  }
})

const getAlbumReviews = async (albumId) => {
  const reviews = await Review.find({ album_id: albumId });
  return reviews;
};

app.put('/review/state', async (request, response) => {
  try {
    const { value, reviewId } = request.body;

    if (value == null || !reviewId) {
      return response.status(400).send({
        message: 'Send all the required fields.',
      });
    }

    const result = await Review.findOneAndUpdate({ _id: reviewId }, { canComment: value });
    if (result.matchedCount === 0) {
      return response.status(404).send({ message: 'Review not found' })
    }

    return response.status(201).send(result)
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
})

app.get('/api/newreleases', async (req, res) => {
  try {
    const token = await getAccessToken();
    const search_url = `https://api.spotify.com/v1/browse/new-releases?limit=18`;

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

app.use('/users', usersRoute);