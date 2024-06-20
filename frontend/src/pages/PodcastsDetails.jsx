import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Loading from '../components/Loading';

const PodcastsDetails = () => {
    const [podcastDetails, setPodcastDetails] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchPodcastDetailsData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/podcasts/details/${id}`)
                const data = await response.json();
                setPodcastDetails(data.podcastDetails);
                console.log(data);
            } catch (error) {
                console.log('Error fetching podcast data: ', error);
            }
        };

        fetchPodcastDetailsData();
    }, [id]);

    if (!podcastDetails) return (<Loading />)
    return (
        <div>
            <div style={{ background: '#404040' }} className='podcastDetailBlock'>
                <div style={{ paddingTop: '40px' }}>
                    <div className='pb-10' style={{ display: 'flex' }}>
                        <div>
                            <img src={podcastDetails.images[1].url} alt={podcastDetails.name} />
                        </div>
                        <div className='pt-48 pl-4'>
                            <h1 style={{ fontSize: '12px' }}>{podcastDetails.release_date}</h1>
                            <h1 style={{ fontSize: '40px', fontWeight: 'bold' }}>{podcastDetails.name}</h1>
                            <h2 style={{ fontSize: '20px' }}>{podcastDetails.name}</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className='border-grey-500 rounded-lg px-4 py-2 mb-4 relative hover:shadow-xl col-span-4'>
                <h4 className='my-2' style={{ fontFamily: 'Arial', fontSize: '24px' }}>Episodes</h4>
                <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'>
                    {podcastDetails.episodes.items.map(podcastDetail => (
                        <div className='border-grey-500 rounded-lg px-4 py-2 m-4 relatice hover:shadow-xl' style={{ backgroundColor: "#100c0c" }} key={podcastDetail.id}>
                            <Link to={`/album/${podcastDetail.id}`}>
                                <img src={podcastDetail.images[0].url} alt={podcastDetail.name}></img>
                                <h4 className='my-2' style={{ fontFamily: 'Arial', fontSize: '24px' }}>{podcastDetail.name}</h4>
                                <div className='flex justify-start items-center gap-x-2'>
                                    <h2 className='my-1' style={{ color: '#D6C4C4' }}>{podcastDetail.release_date}</h2>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default PodcastsDetails