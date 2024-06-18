import React, { useEffect, useState } from 'react'
import '../screen.css';
import Loading from '../components/Loading';

const ArtistsWithData = ({ artistSearch }) => {
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        const fetchArtistsData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/artists?q=${artistSearch}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setArtists(data);
                console.log(data)
            } catch (error) {
                console.error('Error fetching artists data:', error);
            }
        };

        fetchArtistsData();
    }, [artistSearch]);
    if (!artists) return <Loading />;
    return (
        <div>
            <div style={{ paddingTop: '40px' }}>
                <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'>
                    {artists.map(artist => (
                        <div className='border-grey-500 rounded-lg px-4 py-2 m-4 relative hover:bg-gray-600' key={artist.id}>
                            {/* <Link to={`/podcast/${podcast.id}`}> */}
                            <img className='rounded-full' src={artist.images[0].url} alt={artist.name}></img>
                            <h4 className='my-2 title' style={{ fontFamily: 'Arial', fontSize: '24px', textAlign: 'center' }}>{artist.name}</h4>
                            {/* </Link> */}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

const Artists = () => {
    return (
        <div><ArtistsWithData artistSearch='best singer' /></div>
    )
}

export default Artists