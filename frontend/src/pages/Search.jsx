import React, { useEffect, useState } from 'react'
import '../screen.css';
import SearchGenres from './SearchGenres';
import SearchAlbums from './SearchAlbums';
import Signin from '../components/Signin';
import SidebarA from '../components/SidebarA';
import Dropdown from '../components/Dropdown';
import { isAuthenticated } from '../Backend.js';
import { useNavigate } from 'react-router-dom';
import HomeOne from './UsersPage/UserPage.jsx';

const Search = () => {
    const inputRef = React.useRef(null);
    const navigate = useNavigate();
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
            const response = await fetch(`https://music-review.onrender.com/api/search/albums?q=${encodeURIComponent(inputRef.current.value)}`);
            const data = await response.json();
            setAlbums(data);
            changePages();
        } catch (error) {
            console.error('Error fetching albums:', error);
        }
    };
    const authenticatedUser = isAuthenticated(); // Check if the user is authenticated
    return (
        !authenticatedUser ? <Signin /> :
            <div style={{ background: '#282424' }} className='min-h-screen'>
                <SidebarA />
                <div className="leftBody" style={{ color: 'white' }}>
                    <Dropdown />
                    <div className='pt-20 top-6 px-4 py-1'>
                        <form onSubmit={searchAlbums} className='absolute top-18 py-2'>
                            <input
                                type="text"

                                ref={inputRef}
                                placeholder="Search for an album"
                                className='w-full rounded-lg mr-2 pl-4 px-4 py-2 bg-black'
                            />
                        </form>
                        <div className='pt-20'>
                            {defaultPage === 'genresList' ? <SearchGenres /> : <SearchAlbums albums={albums} />}
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Search