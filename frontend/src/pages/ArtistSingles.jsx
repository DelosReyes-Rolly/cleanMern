import React, { useEffect, useState } from 'react'
import '../screen.css';
import Loading from '../components/Loading';
import { Link, useParams } from 'react-router-dom';
import SidebarA from '../components/SidebarA';
import Dropdown from '../components/Dropdown';

const ArtistSingles = () => {
  const [artistSingles, setArtistSingles] = useState(null);
  const { id, artist } = useParams();

  useEffect(() => {
    const fetchArtistSingles = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/artist/singles/${id}`)
        const data = await response.json();
        setArtistSingles(data.artistSingles);
      } catch (error) {
        console.log('Error fetching artist data: ', error);
      }
    };

    fetchArtistSingles();
  }, [id]);

  function getDate(date) {
    let today = new Date(date);
    return new Intl.DateTimeFormat('en-US', { year: 'numeric' }).format(today);
  }

  if (!artistSingles) return <Loading />;
  return (
    <div style={{ background: '#282424' }} className='min-h-screen'>
      <SidebarA />
      <div className="leftBody" style={{ color: 'white' }}>
        <Dropdown />
        <br />
        <div style={{ paddingTop: '80px' }}>
          <h1 style={{ fontSize: '26px' }}>Singles of {artist}</h1><br />
          <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'>
            {artistSingles.items.map((artistSingle) => (
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
        </div>
      </div>
    </div>
  )
}

export default ArtistSingles