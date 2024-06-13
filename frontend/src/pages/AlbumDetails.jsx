import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const AlbumDetails = () => {
  const [album, setAlbum] = useState(null);
  const [tracks, setTracks] = useState([]);
  const {id} = useParams();

  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/album/${id}`);
        const data = await response.json();
        setAlbum(data.album);
        setTracks(data.tracks);
      } catch (error) {
        console.error('Error fetching album data:', error);
      }
    };

    fetchAlbumData();
  }, [id]);

  if (!album) return <div>Loading...</div>;

  return (
    <div>
      <h1>{album.name}</h1>
      <h2>{album.artists.map(artist => artist.name).join(', ')}</h2>
      <img src={album.images[0].url} alt={album.name} />
      <ul>
        {tracks.map(track => (
          <li key={track.id}>
            {track.name} - {track.artists.map(artist => artist.name).join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlbumDetails;
