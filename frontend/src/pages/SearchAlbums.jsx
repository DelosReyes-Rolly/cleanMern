import React, { useEffect, useState } from 'react'
import '../screen.css';
import Sidebar from '../components/SidebarA';
import { Link } from 'react-router-dom';

const SearchAlbums = ({ albums }) => {
    return (
        <div>
            <h1 style={{ fontFamily: 'Arial', fontSize: '26px' }}>Search for albums</h1>
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
    )
}

export default SearchAlbums