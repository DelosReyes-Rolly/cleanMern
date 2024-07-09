import React, { useEffect, useState } from 'react'
import '../screen.css';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';


const PodcastsWithData = ({ podcastSearch }) => {

    const [podcasts, setPodcasts] = useState([]);

    useEffect(() => {
        const fetchPodcastData = async () => {
            try {
                const response = await fetch(`https://music-review.onrender.com/api/podcasts?q=${podcastSearch}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setPodcasts(data);
                console.log(data)
            } catch (error) {
                console.error('Error fetching podcast data:', error);
            }
        };

        fetchPodcastData();
    }, [podcastSearch]);
    if (!podcasts) return <Loading />;
    return (
        <div style={{ paddingTop: '40px' }}>
            <h1 style={{ fontSize: '26px' }}>New Podcast Releases</h1><br />
            <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'>
                {podcasts.map(podcast => (
                    <div className='border-grey-500 rounded-lg px-4 py-2 m-4 relatice hover:shadow-xl' style={{ backgroundColor: "#100c0c" }} key={podcast.id}>
                        <Link to={`/podcast/${podcast.id}`}>
                            <img style={{ borderRadius: '6px', marginTop: '4%' }} src={podcast.images[0].url} alt={podcast.name}></img>
                            <h4 className='my-4 title' style={{ fontWeight: '400' }}>{podcast.name}</h4>
                            <div className='flex justify-start items-center gap-x-2'>
                                <h2 className='title' style={{ color: '#D6C4C4' }}>{podcast.publisher}</h2>
                            </div>
                            <div className='flex justify-start items-center gap-x-2'>
                                <h2 className='' style={{ color: '#D6C4C4' }}>Episodes: {podcast.total_episodes}</h2>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}


const Podcasts = () => {
    return (
        <div>
            <PodcastsWithData podcastSearch="podcast" />
        </div>
    );
};

export default Podcasts