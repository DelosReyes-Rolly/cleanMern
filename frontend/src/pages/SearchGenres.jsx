import React, { useEffect, useState } from 'react'
import '../screen.css';
import Sidebar from '../components/SidebarA';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';

const SearchGenres = () => {
    const [genres, setGenres] = useState([]);
    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/genres`);
                const data = await response.json();
                setGenres(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        };

        fetchGenres();
    }, []);

    if (genres.length === 0) return <Loading />;
    return (
        <div>
            <h1 style={{ fontFamily: 'Arial', fontSize: '26px' }}>Browse All</h1>
            <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {genres.map(genre => (
                    <div className='rounded-lg px-6 pt-4 pb-20 m-4 relative hover:shadow-xl' style={{ backgroundColor: "#" + Math.random().toString(16).substr(-6) }} key={genre}>
                        <Link to={`/albums/${genre}`}>
                            <h1 style={{ textTransform: 'capitalize', fontSize: '28px', fontWeight: 'bold', fontFamily: 'Sans-serif' }}>{genre}</h1>
                        </Link>
                    </div>
                ))}
                * Need to fix status 429: too many request
            </div>
        </div>
    )
}

export default SearchGenres