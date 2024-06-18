import React, { useEffect, useState } from 'react'
import '../screen.css';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';

const AlbumsDetailsOne = ({ albumId }) => {

    const [albums, setAlbum] = useState(null);

    useEffect(() => {
        const fetchAlbumData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/search/albums?q=${albumId}`);
                const data = await response.json();
                setAlbum(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching album data:', error);
            }
        };

        fetchAlbumData();
    }, [albumId]);
    if (!albums) return <Loading />;
    return (
        <div>
            <div style={{ paddingTop: '40px' }}>
                <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'>
                    {albums.map(album => (
                        <div className='border-grey-500 rounded-lg px-4 py-2 m-4 relatice hover:shadow-xl' style={{ backgroundColor: "#100c0c" }} key={album.id}>
                            <Link to={`/album/${album.id}`}>
                                <img src={album.images[0].url} alt={album.name}></img>
                                <h4 className='my-2' style={{ fontFamily: 'Arial', fontSize: '24px' }}>{album.name}</h4>
                                <div className='flex justify-start items-center gap-x-2'>
                                    <h2 className='my-1' style={{ color: '#D6C4C4' }}>{album.artists.map(artist => artist.name)}</h2>
                                </div>
                                <div className='flex justify-start items-center gap-x-2'>
                                    <h2 className='my-1' style={{ color: '#D6C4C4' }}>{album.release_date}</h2>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

const All = () => {
    return (
        <div>
            <AlbumsDetailsOne albumId="maroon 5" />
        </div>
    );
};

export default All