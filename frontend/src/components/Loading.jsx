import React from 'react'
import '../loader.css'
import '../screen.css';

const Loading = () => {
  return (
    <div style={{ background: '#282424', height: '100vh' }}>
    <div className="loading">Loading&#8230;</div>
    </div>
  )
}

export default Loading