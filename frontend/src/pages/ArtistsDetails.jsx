import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading';
import { Link, useParams } from 'react-router-dom';
import SidebarA from '../components/SidebarA';
import Dropdown from '../components/Dropdown';


const ArtistsDetails = () => {
    const [artist, setArtist] = useState(null);
    const [artistAlbums, setArtistAlbums] = useState(null);
    const [artistRelated, setArtistRelated] = useState(null);
    const [artistSingles, setArtistSingles] = useState(null);
    const { id } = useParams();
    const [albumLimit, setAlbumLimit] = useState(false);
    const [artistLimit, setArtistLimit] = useState(false);
    const [singleLimit, setSingleLimit] = useState(false);

    useEffect(() => {
        const fetchArtistsData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/artist/${id}`)
                const data = await response.json();
                setArtist(data.artist);
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
                if (data.artistAlbums.items.length > 6) {
                    setAlbumLimit(true);
                }
                setArtistAlbums(data.artistAlbums);
            } catch (error) {
                console.log('Error fetching artist data: ', error);
            }
        };

        fetchArtistAlbums();
    }, [id]);

    useEffect(() => {
        const fetchArtistSingles = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/artist/singles/${id}`)
                const data = await response.json();
                if (data.artistSingles.items.length > 6) {
                    setSingleLimit(true);
                }
                setArtistSingles(data.artistSingles);
            } catch (error) {
                console.log('Error fetching artist data: ', error);
            }
        };

        fetchArtistSingles();
    }, [id]);

    useEffect(() => {
        const fetchArtistRelated = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/artist/related/${id}`)
                const data = await response.json();
                if (data.artistRelated.artists.length > 6) {
                    setArtistLimit(true);
                }
                setArtistRelated(data.artistRelated);
            } catch (error) {
                console.log('Error fetching artist data: ', error);
            }
        };

        fetchArtistRelated();
    }, [id]);

    function getDate(date) {
        let today = new Date(date);
        return new Intl.DateTimeFormat('en-US', { year: 'numeric' }).format(today);
    }

    if (!artistRelated || !artistAlbums || !artist || !artistSingles) return <Loading />

    return (
        <div style={{ background: '#282424' }} className='min-h-screen'>
            <SidebarA />
            <div className="leftBody" style={{ color: 'white' }}>
                <Dropdown />
                <br />
                <div style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),url(${artist.images[1].url})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', filter: 'blur(24px)' }} id="myVideo"></div>
                <div className='artistAlbumBlock welcome-hero'>
                    <div style={{ paddingTop: '80px' }}>
                        <div className='my-8 pb-10' style={{ display: 'flex' }}>
                            <div>
                                <img src={artist.images[1].url} alt={artist.name} className='img-detail' />
                            </div>
                            <div className='pt-48 pl-4'>
                                <h2 style={{ fontSize: '20px' }}>This is</h2>
                                <h1 style={{ fontSize: '40px', fontWeight: 'bold' }}>{artist.name}</h1>
                            </div>
                        </div>
                    </div>
                </div><br />
                <div className='border-t-2 border-gray-800 divider'></div><br />
                <div className='border-grey-500 rounded-lg px-4 py-2 relative hover:shadow-xl col-span-4'>
                    <h4 className='my-2' style={{ fontSize: '24px' }}>Singles</h4>
                    <Link to={`/artist/singles/${id}/${artist.name}`} className={singleLimit ? 'float-right' : 'hidden'}>
                        Show all
                    </Link>
                    <br />
                    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'>
                        {artistSingles.items.slice(0, 6).map((artistSingle) => (
                            <div className='border-grey-500 rounded-lg px-4 py-2 m-4 relatice hover:shadow-xl' style={{ backgroundColor: "#100c0c" }} key={artistSingle.id}>
                                <Link to={`/album/${artistSingle.id}`}>
                                    <img style={{ borderRadius: '6px', marginTop: '4%' }} src={artistSingle.images[0].url} alt={artistSingle.name}></img>
                                    <h4 className='my-2 title' style={{ fontWeight: '400' }}>{artistSingle.name}</h4>
                                    <div className='flex justify-start items-center gap-x-2'>
                                        <h2 className='my-1' style={{ color: '#D6C4C4' }}>{getDate(artistSingle.release_date)}</h2>
                                    </div>
                                </Link>
                            </div>
                        )
                        )}
                    </div>
                    <br /><br /><br /><br />
                    <h4 className='my-2' style={{ fontSize: '24px' }}>Albums</h4>
                    <Link to={`/artist/albums/${id}/${artist.name}`} className={albumLimit ? 'float-right' : 'hidden'}>
                        Show all
                    </Link>
                    <br />
                    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'>
                        {artistAlbums.items.slice(0, 6).map(artistAlbum => (
                            <div className='border-grey-500 rounded-lg px-4 py-2 m-4 relatice hover:shadow-xl' style={{ backgroundColor: "#100c0c" }} key={artistAlbum.id}>
                                <Link to={`/album/${artistAlbum.id}`}>
                                    <img style={{ borderRadius: '6px', marginTop: '4%' }} src={artistAlbum.images[0].url} alt={artistAlbum.name}></img>
                                    <h4 className='my-2 title' style={{ fontWeight: '400' }}>{artistAlbum.name}</h4>
                                    <div className='flex justify-start items-center gap-x-2'>
                                        <h2 className='my-1' style={{ color: '#D6C4C4' }}>{getDate(artistAlbum.release_date)}</h2>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <br /><br /><br /><br />
                    <h4 className='my-2' style={{ fontSize: '24px' }}>Related Artists</h4>
                    <Link to={`/artist/related/${id}/${artist.name}`} className={artistLimit ? 'float-right' : 'hidden'}>
                        Show all
                    </Link>
                    <br />
                    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'>
                        {artistRelated.artists.slice(0, 6).map(artistRelated => (
                            <div className='border-grey-500 rounded-lg px-4 py-2 m-4 relative hover:bg-gray-600' key={artistRelated.id}>
                                <Link to={`/artist/${artistRelated.id}`}>
                                    <img className='rounded-full' src={artistRelated.images[0].url} alt={artistRelated.name}></img>
                                    <h4 className='my-2 title' style={{ textAlign: 'center', fontWeight: '400' }}>{artistRelated.name}</h4>
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