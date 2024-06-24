import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SidebarA from '../components/SidebarA';
import Loading from '../components/Loading';
import Dropdown from '../components/Dropdown.jsx';
import { BiShow } from 'react-icons/bi'
import TracksModal from '../components/TracksModal.jsx';
import AboutModal from '../components/AboutModal.jsx';

const AlbumDetails = () => {
  const [album, setAlbum] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [showTracksModal, setShowTracksModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/album/${id}`);
        const data = await response.json();
        setAlbum(data.album);
        setTracks(data.tracks);
        console.log(data);
      } catch (error) {
        console.error('Error fetching album data:', error);
      }
    };

    fetchAlbumData();
  }, [id]);

  if (!album) return <Loading />;

  return (
    <div style={{ background: '#282424' }}>
      <SidebarA />
      <div className="leftBody" style={{ color: 'white' }}>
        <Dropdown />
        <br />
        <div style={{ background: '#404040' }} className='artistAlbumBlock'>
          <div style={{ paddingTop: '40px' }}>
            <div className='my-8 pb-10' style={{ display: 'flex' }}>
              <div>
                <img src={album.images[1].url} alt={album.name} />
              </div>
              <div className='pt-48 pl-4'>
                <h1 style={{ fontSize: '12px' }}>{album.release_date}</h1>
                <h1 style={{ fontSize: '40px', fontWeight: 'bold' }}>{album.name}</h1>
                <h2 style={{ fontSize: '20px' }}>{album.artists.map(artist => artist.name).join(', ')}</h2>
                <div className='flex items-stretch'>
                  <button className='flex items-stretch p-2 mr-2 bg-indigo-600 rounded-lg hover:bg-indigo-800' onClick={() => setShowAboutModal(true)}>
                    <BiShow className='text-2xl cursor-pointer' />
                    Show About
                  </button>
                  <button className='flex items-stretch p-2 mr-2 bg-indigo-600 rounded-lg hover:bg-indigo-800' onClick={() => setShowTracksModal(true)}>
                    <BiShow className='text-2xl cursor-pointer' />
                    Show Tracks
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='border-grey-500 rounded-lg px-4 py-2 relative hover:shadow-xl' style={{ backgroundColor: "#100c0c" }}>
          <h4 className='my-2' style={{ fontFamily: 'Arial', fontSize: '24px' }}>Reviews</h4>
          <div className='flex justify-start items-center gap-x-2'>
            <h2 className='my-1' style={{ color: '#D6C4C4' }}>asdasd</h2>
          </div>
          <div className='flex justify-start items-center gap-x-2'>
            <h2 className='my-1' style={{ color: '#D6C4C4' }}>asdasdasd</h2>
          </div>
        </div>
      </div>
      {
        showTracksModal && (
          <TracksModal album={album} onClose={() => setShowTracksModal(false)} tracks={tracks} />
        )
      }
      {
        showAboutModal && (
          <AboutModal album={album} onClose={() => setShowAboutModal(false)} />
        )
      }
    </div>
  );
};
export default AlbumDetails;