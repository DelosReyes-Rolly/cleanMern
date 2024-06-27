import React, { useState, useEffect, useCallback } from 'react';

const Rev = ({ reviewsone, handleComment, handleCommentVisibility, comments, setComments }) => {
  const { canComment, comments: reviewComments, description, title, user, _id } = reviewsone;
  const [commentVisibility, setCommentVisibility] = useState(canComment);

  const handleChange = useCallback((e) => {
    setComments(prevComments => ({ ...prevComments, [e.target.id]: e.target.value }));
  }, [setComments]);

  return (
    <div style={{ color: '#D6C4C4' }}>
      {user} <br />
      {title} <br />
      {description} <br />
      {
        reviewComments.map(com => (
          <div key={com._id}>
            {com.user}<br />
            {com.comment}<br />
          </div>
        ))
      }
      {
        commentVisibility === 0 ? (
          <div>
            <div onClick={() => setCommentVisibility(1)}>
              <button onClick={() => handleCommentVisibility(1, _id)}>Disable comments</button>
            </div>
            <textarea
              placeholder='comment'
              className='w-full border-b-4 rounded-lg outline-none border-blue-600 text-white p-2 mb-4 bg-gray-800'
              id={_id}
              name='comment'
              value={comments[_id] || ''}
              onChange={handleChange} />
            <div className="form-group-button">
              <button className='bg-indigo-600 rounded-lg px-6 py-2 hover:bg-indigo-800' onClick={() => handleComment(_id)}>Comment</button>
            </div>
          </div>
        ) : (
          <div onClick={() => setCommentVisibility(0)}>
            <button onClick={() => handleCommentVisibility(0, _id)}>Enable comments</button>
            -- User disabled comment for this review --
          </div>
        )
      }
    </div>
  )
};

export default Rev;
