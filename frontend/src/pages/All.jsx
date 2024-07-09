import React, { useEffect, useState } from 'react'
import '../screen.css';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';

const All = () => {

    const [albums, setAlbum] = useState(null);

    useEffect(() => {
        const fetchAlbumData = async () => {
            try {
                const response = await fetch(`https://music-review.onrender.com/api/newreleases`);
                const data = await response.json();
                setAlbum(data);
            } catch (error) {
                console.error('Error fetching album data:', error);
            }
        };

        fetchAlbumData();
    }, []);

    function getDate(date) {
        let today = new Date(date);
        return new Intl.DateTimeFormat('en-US', { year: 'numeric' }).format(today);
    }
    if (!albums) return <Loading />;
    return (
        <div>
            <div style={{ paddingTop: '40px' }}>
                <h1 style={{ fontSize: '26px' }}>New Album Releases</h1><br />
                <div className='grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6'>
                    {albums.map(album => (
                        <div className='border-grey-500 rounded-lg px-4 py-2 m-4 relatice hover:shadow-xl' style={{ backgroundColor: "#100c0c" }} key={album.id}>
                            <Link to={`/album/${album.id}`}>
                                <img style={{ borderRadius: '6px', marginTop: '4%' }} src={album.images[0].url} alt={album.name}></img>
                                <h4 className='my-4 title' style={{ fontWeight: '400' }}>{album.name}</h4>
                                <div className='flex justify-start items-center gap-x-2'>
                                    <h2 className='title' style={{ color: '#D6C4C4' }}>{album.artists.map(artist => artist.name)}</h2>
                                </div>
                                <div className='flex justify-start items-center gap-x-2'>
                                    <h2 className='' style={{ color: '#D6C4C4' }}>{getDate(album.release_date)}</h2>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
};

export default All