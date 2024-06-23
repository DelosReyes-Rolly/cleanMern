import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading';
import { Link, useParams } from 'react-router-dom';
import SidebarA from '../components/SidebarA';
import Dropdown from '../components/Dropdown';


const ArtistsDetails = () => {
    const [artist, setArtist] = useState(null);
    const [artistAlbums, setArtistAlbums] = useState(null);
    const [artistRelated, setArtistRelated] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchArtistsData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/artist/${id}`)
                const data = await response.json();
                setArtist(data.artist);
                console.log(data);
            } catch (error) {
                console.log('Error fetching artist data: ', error);
            }
        };

        fetchArtistsData();
    }, [id]);

    useEffect(() => {
        const fetchArtistAlbums = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/artist/albums/${id}`)
                const data = await response.json();
                setArtistAlbums(data.artistAlbums)
                console.log(data)
            } catch (error) {
                console.log('Error fetching artist data: ', error);
            }
        };

        fetchArtistAlbums();
    }, [id]);

    useEffect(() => {
        const fetchArtistRelated = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/artist/related/${id}`)
                const data = await response.json();
                setArtistRelated(data.artistRelated)
                console.log(data)
            } catch (error) {
                console.log('Error fetching artist data: ', error);
            }
        };

        fetchArtistRelated();
    }, [id]);

    if (!artistRelated || !artistAlbums || !artist) return <Loading />

    return (
        <div style={{ background: '#282424', height: '100vh' }}>
            <SidebarA />
            <div className="leftBody" style={{ color: 'white' }}>
                <Dropdown />
                <div style={{ background: '#404040' }} className='artistAlbumBlock'>
                    <div style={{ paddingTop: '40px' }}>
                        <div className='pb-10' style={{ display: 'flex' }}>
                            <div>
                                <img src={artist.images[1].url} alt={artist.name} />
                            </div>
                            <div className='pt-48 pl-4'>
                                <h1 style={{ fontSize: '12px' }}>{artist.release_date}</h1>
                                <h1 style={{ fontSize: '40px', fontWeight: 'bold' }}>{artist.name}</h1>
                                <h2 style={{ fontSize: '20px' }}>{artist.name}</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='border-grey-500 rounded-lg px-4 py-2 mb-4 relative hover:shadow-xl col-span-4'>
                    <h4 className='my-2' style={{ fontFamily: 'Arial', fontSize: '24px' }}>Singles</h4>
                    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'>
                        {artistAlbums.items.map(artistAlbum => (
                            <div className='border-grey-500 rounded-lg px-4 py-2 m-4 relatice hover:shadow-xl' style={{ backgroundColor: "#100c0c" }} key={artistAlbum.id}>
                                <Link to={`/album/${artistAlbum.id}`}>
                                    <img src={artistAlbum.images[0].url} alt={artistAlbum.name}></img>
                                    <h4 className='my-2' style={{ fontFamily: 'Arial', fontSize: '24px' }}>{artistAlbum.name}</h4>
                                    <div className='flex justify-start items-center gap-x-2'>
                                        <h2 className='my-1' style={{ color: '#D6C4C4' }}>{artistAlbum.release_date}</h2>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='border-grey-500 rounded-lg px-4 py-2 mb-4 relative hover:shadow-xl col-span-4'>
                    <h4 className='my-2' style={{ fontFamily: 'Arial', fontSize: '24px' }}>Albums</h4>
                    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'>
                        {artistAlbums.items.map(artistAlbum => (
                            <div className='border-grey-500 rounded-lg px-4 py-2 m-4 relatice hover:shadow-xl' style={{ backgroundColor: "#100c0c" }} key={artistAlbum.id}>
                                <Link to={`/album/${artistAlbum.id}`}>
                                    <img src={artistAlbum.images[0].url} alt={artistAlbum.name}></img>
                                    <h4 className='my-2' style={{ fontFamily: 'Arial', fontSize: '24px' }}>{artistAlbum.name}</h4>
                                    <div className='flex justify-start items-center gap-x-2'>
                                        <h2 className='my-1' style={{ color: '#D6C4C4' }}>{artistAlbum.release_date}</h2>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='rounded-lg px-4 py-2 mb-4 relative hover:shadow-xl col-span-4'>
                    <h4 className='my-2' style={{ fontFamily: 'Arial', fontSize: '24px' }}>Related Artists</h4>
                    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'>
                        {artistRelated.artists.map(artistRelated => (
                            <div className='border-grey-500 rounded-lg px-4 py-2 m-4 relative hover:bg-gray-600' key={artistRelated.id}>
                                <Link to={`/artist/${artistRelated.id}`}>
                                    <img className='rounded-full' src={artistRelated.images[0].url} alt={artistRelated.name}></img>
                                    <h4 className='my-2 title' style={{ fontFamily: 'Arial', fontSize: '24px', textAlign: 'center' }}>{artistRelated.name}</h4>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArtistsDetails