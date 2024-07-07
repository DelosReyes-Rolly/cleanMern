import React, { useEffect, useState } from 'react'
import '../screen.css';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import SidebarA from '../components/SidebarA';
import Dropdown from '../components/Dropdown';


const GenreAlbum = () => {
    const [albums, setAlbums] = useState([]);
    const { genre } = useParams();

    useEffect(() => {
        const fetchAlbumsByGenre = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/albums/genre/${genre}`);
                const data = await response.json();
                setAlbums(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching albums:', error);
            }
        };

        fetchAlbumsByGenre();
    }, [genre]);

    function getDate(date) {
        let today = new Date(date);
        return new Intl.DateTimeFormat('en-US', { year: 'numeric' }).format(today);
    }
    if (albums === 0) return <Loading />;
    return (
        <div style={{ background: '#282424'}} className='min-h-screen'>
            <SidebarA />
            <div className="leftBody" style={{ color: 'white' }}>
                <Dropdown />
                <div className='pt-20 top-6 px-4 py-1'>
                    <h1 style={{ fontSize: '26px' }}>Albums in {genre}</h1>
                    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'>
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
        </div>
    )
}

export default GenreAlbum