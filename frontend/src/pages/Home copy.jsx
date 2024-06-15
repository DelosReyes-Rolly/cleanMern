import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [query, setQuery] = useState(() => {
    return ''
  });
  const [albums, setAlbums] = useState(() => {
    return []
  });

  const searchAlbums = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/search/albums?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      setAlbums(data);
    } catch (error) {
      console.error('Error fetching albums:', error);
    }
  };

  return (
    <div>
      <h1>Search Albums</h1>
      <form onSubmit={searchAlbums}>
        <input 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Search for an album" 
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {albums.map(album => (
          <li key={album.id}>
            <Link to={`/album/${album.id}`}>
              {album.name} by {album.artists.map(artist => artist.name).join(', ')} (ID: {album.id})
            </Link>  
            </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
