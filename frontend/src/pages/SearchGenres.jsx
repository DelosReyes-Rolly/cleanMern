import React, { useEffect, useState } from 'react'
import '../screen.css';
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
        <div style={{ paddingTop: '20px' }}>
            <h1 style={{ fontSize: '26px' }}>Browse All Genres</h1><br />
            <div className='grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-6'>
                {genres.map(genre => (
                    <div className='rounded-lg px-6 pt-4 pb-6 m-4 relative hover:shadow-xl  ' style={{ backgroundColor: 'hsl(' + Math.random() * 360 + ', 80%, 40%)' }} key={genre}>
                        <Link to={`/albums/${genre}`}>
                            <h1 style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>{genre}</h1>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SearchGenres