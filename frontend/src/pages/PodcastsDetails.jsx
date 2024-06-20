import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
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

        </div>
    )
}

export default PodcastsDetails