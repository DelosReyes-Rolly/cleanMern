import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import SidebarA from '../components/SidebarA';
import Loading from '../components/Loading';
import Dropdown from '../components/Dropdown.jsx';
import { BiShow } from 'react-icons/bi'
import TracksModal from '../components/TracksModal.jsx';
import AboutModal from '../components/AboutModal.jsx';
import { isAuthenticated } from '../Backend.js';
import axios from 'axios'
import { useSnackbar } from 'notistack'
import Rev from './Rev';

const AlbumDetails = () => {
  const authenticatedUser = isAuthenticated();
  const [album, setAlbum] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [showTracksModal, setShowTracksModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const userId = authenticatedUser.user._id;
  const userName = authenticatedUser.user.name;
  const { enqueueSnackbar } = useSnackbar();
  const [reviews, setReviews] = useState([]);
  const [comments, setComments] = useState({});

  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/album/${id}`);
        const data = await response.json();
        setTracks(data.tracks);
        setReviews(data.albumReviews);
        setAlbum(data.album);
        console.log(data.albumReviews);
      } catch (error) {
        console.error('Error fetching album data:', error);
      }
    };

    fetchAlbumData();
  }, [id]);

  const handleReview = () => {
    const data = {
      userId,
      userName,
      title,
      description,
    };
    axios
      .post(`http://localhost:3000/album/review/${id}`, data)
      .then(() => {
        enqueueSnackbar('Review Submitted', { variant: 'success' });
      })
      .catch((error) => {
        enqueueSnackbar('An error happened.', { variant: 'error' });
        console.log(error);
      });
  };

  const handleComment = useCallback((reviewId) => {
    const commentOne = comments[reviewId] || '';
    const data = {
      userId,
      userName,
      commentOne,
    };
    axios
      .post(`http://localhost:3000/album/comment/${reviewId}`, data)
      .then(() => {
        enqueueSnackbar('Comment Submitted', { variant: 'success' });
      })
      .catch((error) => {
        enqueueSnackbar('An error happened', { variant: 'error' });
        console.log(error);
      });
  }, [comments, userId, userName, enqueueSnackbar]);

  const handleCommentVisibility = useCallback((value, reviewId) => {
    const reviewStateData = {
      value,
      reviewId
    };
    axios
      .put(`http://localhost:3000/review/state`, reviewStateData)
      .then((response) => {
        enqueueSnackbar('Comment state changed', { variant: 'success' });
        console.log(response.data.canComment);
      })
      .catch((error) => {
        enqueueSnackbar('An error happened', { variant: 'error' });
        console.log(error);
      });
  }, [enqueueSnackbar]);

  if (!album || !tracks) return <Loading />;

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
          <div className='grid place-items-center mb-6'>
            <span className="flex flex-row-reverse">
              <svg className="ml-4 text-gray-600 cursor-pointer peer peer-hover:text-yellow-400 hover:text-yellow-400 duration-100 " width="28" height="28" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
              </svg>

              <svg className="ml-4 text-gray-600 cursor-pointer peer peer-hover:text-yellow-400 hover:text-yellow-400 duration-100 " width="28" height="28" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
              </svg>

              <svg className="ml-4 text-gray-600 cursor-pointer peer peer-hover:text-yellow-400 hover:text-yellow-400 duration-100 " width="28" height="28" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
              </svg>

              <svg className="ml-4 text-gray-600 cursor-pointer peer peer-hover:text-yellow-400 hover:text-yellow-400 duration-100 " width="28" height="28" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
              </svg>
            </span>
          </div>
          <input type='text'
            placeholder='Title'
            className='w-full border-b-4 rounded-lg outline-none border-blue-600 text-white p-2 mb-6 bg-gray-800'
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            name='title' />
          <textarea
            id='description'
            value={description}
            placeholder='Add a review'
            className='w-full border-b-4 rounded-lg outline-none border-blue-600 text-white p-2 mb-4 bg-gray-800'
            onChange={e => setDescription(e.target.value)} />
          <div className="form-group-button">
            <button onClick={handleReview} className='bg-indigo-600 rounded-lg px-6 py-2 hover:bg-indigo-800'>Submit</button>
          </div>
        </div>

        {
          reviews.map(rev => (
            <div key={rev._id}>
              <Rev reviewsone={rev} handleComment={handleComment} handleCommentVisibility={handleCommentVisibility} comments={comments} setComments={setComments} />
            </div>
          ))
        }

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
