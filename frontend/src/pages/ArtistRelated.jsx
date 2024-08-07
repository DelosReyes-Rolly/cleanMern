import React, { useEffect, useState } from 'react'
import '../screen.css';
import Loading from '../components/Loading';
import { Link, useParams } from 'react-router-dom';
import SidebarA from '../components/SidebarA';
import Dropdown from '../components/Dropdown';

const ArtistRelated = () => {
    const [artistRelated, setArtistRelated] = useState(null);
    const { id, artist } = useParams();

    useEffect(() => {
        const fetchArtistRelated = async () => {
            try {
                const response = await fetch(`https://music-review.onrender.com/api/artist/related/${id}`)
                const data = await response.json();
                setArtistRelated(data.artistRelated);
            } catch (error) {
                console.log('Error fetching artist data: ', error);
            }
        };

        fetchArtistRelated();
    }, [id]);

    if (!artistRelated) return <Loading />;
    return (
        <div style={{ background: '#282424' }} className='min-h-screen'>
            <SidebarA />
            <div className="leftBody" style={{ color: 'white' }}>
                <Dropdown />
                <br />
                <div style={{ paddingTop: '80px' }}>
                    <h1 style={{ fontSize: '26px' }}>More artists like {artist}</h1><br />
                    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'>
                        {artistRelated.artists.slice(0, 18).map(artist => (
                            <div className='border-grey-500 rounded-lg px-4 py-2 m-4 relative hover:bg-gray-600' key={artist.id}>
                                <Link to={`/artist/${artist.id}`}>
                                    <img className='rounded-full' src={artist.images[0].url} alt={artist.name}></img>
                                    <h4 className='my-2 title' style={{ textAlign: 'center', fontWeight: '400' }}>{artist.name}</h4>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArtistRelated