import React, { useEffect, useState } from 'react'
import '../screen.css';
import Sidebar from '../components/SidebarA';
import { Link } from 'react-router-dom';
import SearchGenres from './SearchGenres';
import SearchAlbums from './SearchAlbums';

const Search = () => {
    const [defaultPage, newPage] = useState('genresList');
    const changePages = () => {
        newPage(defaultPage == 'genresList' ? 'albumsList' : 'genresList');
    }

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
            changePages();
        } catch (error) {
            console.error('Error fetching albums:', error);
        }
    };
    return (
        <div className='pt-20 top-6 px-4 py-1'>
            <form onSubmit={searchAlbums} className='absolute top-18 py-2'>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for an album"
                    className='rounded-lg mr-2 pl-4 px-28 py-2 bg-black'
                />
            </form>
            <div className='pt-20'>
                {defaultPage === 'genresList' ? <SearchGenres /> : <SearchAlbums albums={albums} />}
            </div>
        </div>
    )
}

export default Search