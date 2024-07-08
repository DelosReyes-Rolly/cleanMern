import React, { useState, useEffect, useCallback } from 'react';

const Rev = ({ reviewsone, handleComment, handleCommentVisibility, comments, setComments }) => {
  const { canComment, comments: reviewComments, description, title, user, _id } = reviewsone;
  const [commentVisibility, setCommentVisibility] = useState(canComment);

  const handleChange = useCallback((e) => {
    setComments(prevComments => ({ ...prevComments, [e.target.id]: e.target.value }));
  }, [setComments]);

  return (
    <div>
      <div className='border-grey-600 bg-gray-600 rounded-lg px-4 py-2 relative' style={{ boxShadow: "2px 2px 4px rgba(0.4, 0.4, 0.4, 0.4)" }}>
        <div className='text-l pt-2 pb-6'>{user}</div>
        <hr style={{ margin: '-12px' }} /><br />
        <div className='ml-6'>
          <p className='text-xl'>{title}</p> <br />
          {description} <br />
        </div>
      </div><br />

      {
        reviewComments.map(com => (
          <div key={com._id}>
            <div className='border-grey-600 bg-gray-400 rounded-lg px-4 py-2 relative ml-20' style={{ boxShadow: "2px 2px 4px rgba(0.4, 0.4, 0.4, 0.4)" }}>
              <div className='text-l pt-2 pb-6'>{com.user}</div>
              <hr style={{ margin: '-12px' }} /><br />
              <div className='ml-6'>{com.comment}</div>
            </div>
            <br />
          </div>
        ))
      }
      {
        commentVisibility === 0 ? (
          <div>
            <div className='grid sm:grid-cols-6 lg:grid-cols-6 xl:grid-cols-6'>
              <textarea
                placeholder='Write a comment'
                className='w-full border-b-4 rounded-lg outline-none border-blue-600 text-white p-2 mb-4 bg-gray-800 col-start-1 col-span-4'
                id={_id}
                name='comment'
                value={comments[_id] || ''}
                rows='2'
                onChange={handleChange} />
              <div className="form-group-button col-span-1">
                &emsp;<button className='bg-indigo-600 rounded-lg px-8 py-4 hover:bg-indigo-800' onClick={() => handleComment(_id)}>Comment</button>
              </div>
              <div onClick={() => setCommentVisibility(1)} className="form-group-button col-span-1">
                &emsp;<button className='bg-red-600 rounded-lg px-10 py-4 hover:bg-red-800' onClick={() => handleCommentVisibility(1, _id)}>Disable</button>
              </div>
            </div>
          </div>
        ) : (
          <div onClick={() => setCommentVisibility(0)}>
            <div className='grid sm:grid-cols-6 lg:grid-cols-6 xl:grid-cols-6'>
              <textarea
                placeholder='Reviewer disabled commenting on this review.'
                className='w-full border-b-4 rounded-lg outline-none border-blue-600 text-white p-2 mb-4 bg-gray-800 col-start-1 col-span-4'
                disabled
                rows='2' />
              <div className='form-group-button col-span-２'>
                <button className='bg-green-600 rounded-lg px-8 py-2 hover:bg-green-800' onClick={() => handleCommentVisibility(0, _id)}>Enable comments</button>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
};

export default Rev;
