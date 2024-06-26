import React, { useState, useEffect } from 'react';
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

const AlbumDetails = () => {
  const authenticatedUser = isAuthenticated();
  const [album, setAlbum] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [showTracksModal, setShowTracksModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const { id } = useParams();
  const [star, setStar] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const userId = authenticatedUser.user._id;
  const { enqueueSnackbar } = useSnackbar();
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState({});

  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/album/${id}`);
        const data = await response.json();
        setTracks(data.tracks);
        setReviews(data.albumReviews);
        setAlbum(data.album);
        console.log(data.albumReviews);
        console.log(data.albumReviews.comments);
      } catch (error) {
        console.error('Error fetching album data:', error);
      }
    };

    fetchAlbumData();
  }, [id]);

  const handleReview = () => {
    const data = {
      userId,
      title,
      description,
    };
    axios
      .post(`http://localhost:3000/album/review/${id}`, data)
      .then(() => {
        enqueueSnackbar('Review Submitted', { variant: 'suceess' });
      })
      .catch((error) => {
        enqueueSnackbar('An error happened.', { variant: 'error' });
        console.log(error);
      });
  };

  const handleComment = () => {
    const commentOne = comment.comment;
    const data = {
      userId,
      commentOne,
    };
    console.log(commentOne);
    axios
      .post(`http://localhost:3000/album/comment/${comment.id}`, data)
      .then(() => {
        enqueueSnackbar('Comment Submitted', { variant: 'success' });
      })
      .catch((error) => {
        enqueueSnackbar('An error happened', { variant: 'error' });
        console.log(error);
      })
  }

  if (!album || !tracks) return <Loading />;

  return (
    <div style={{ background: '#282424' }}>
      <SidebarA />
      <div className="leftBody" style={{ color: 'white' }}>
        <Dropdown />
        <br />
        <div style={{ background: '#404040' }} className='artistAlbumBlock'>
          {/* <div style={{ paddingTop: '40px' }}>
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
          </div> */}
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
            placeholder='description'
            className='w-full border-b-4 rounded-lg outline-none border-blue-600 text-white p-2 mb-4 bg-gray-800'
            id='description'
            name='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)} />
          <div className="form-group-button">
            <button className='bg-indigo-600 rounded-lg px-6 py-2 hover:bg-indigo-800' onClick={handleReview}>Send Review</button>
          </div>
          <h4 className='my-2' style={{ fontFamily: 'Arial', fontSize: '24px' }}>Reviews</h4>
          <div className='flex justify-start items-center gap-x-2'>
            {reviews?.map(review => (
              <div key={review._id} style={{ color: '#D6C4C4' }}>
                {review.title}
                {review.description}
                {review?.comments.map(com => (
                  <div>{com.comment}</div>
                ))}
                <textarea
                  placeholder='comment'
                  className='w-full border-b-4 rounded-lg outline-none border-blue-600 text-white p-2 mb-4 bg-gray-800'
                  id={review._id}
                  name='comment'
                  onChange={(e) => setComment({ id: review._id, comment: e.target.value })} />
                <div className="form-group-button">
                  <button className='bg-indigo-600 rounded-lg px-6 py-2 hover:bg-indigo-800' onClick={handleComment}>Comment</button>
                </div>
              </div>
            ))}
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
    </div >
  );
};
export default AlbumDetails;