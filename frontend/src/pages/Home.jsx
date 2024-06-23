import React, { useState } from 'react'
import All from './All'
import Podcasts from './Podcasts'
import Artists from './Artists'
import Playlist from './Playlist'
import SidebarA from '../components/SidebarA.jsx'
import Dropdown from '../components/Dropdown.jsx'
import { isAuthenticated } from '../Backend.js';
import Signin from '../components/Signin.jsx'

const Home = () => {
  const [defaultPage, newPage] = useState('all')
  const authenticatedUser = isAuthenticated(); // Check if the user is authenticated

  const changePage = (page) => {
    newPage(page)
  }

  return (
    !authenticatedUser ? <Signin /> :
      <div style={{ background: '#282424' }}>
        <SidebarA />
        <div className="leftBody" style={{ color: 'white' }}>
          <Dropdown />
          <div className='pt-20 top-6 px-4 py-1'>
            <button className={defaultPage === 'all' ? 'rounded-lg mr-2 pl-4 px-4 py-2 bg-white text-black font-bold' : 'rounded-lg mr-2 pl-4 px-4 py-2 bg-black'} onClick={() => changePage('all')}>All</button>
            <button className={defaultPage === 'podcasts' ? 'rounded-lg mr-2 pl-4 px-4 py-2 bg-white text-black font-bold' : 'rounded-lg mr-2 pl-4 px-4 py-2 bg-black'} onClick={() => changePage('podcasts')}>Podcasts</button>
            <button className={defaultPage === 'artists' ? 'rounded-lg mr-2 pl-4 px-4 py-2 bg-white text-black font-bold' : 'rounded-lg mr-2 pl-4 px-4 py-2 bg-black'} onClick={() => changePage('artists')}>Artists</button>
            <button className={defaultPage === 'playlists' ? 'rounded-lg mr-2 pl-4 px-4 py-2 bg-white text-black font-bold' : 'rounded-lg mr-2 pl-4 px-4 py-2 bg-black'} onClick={() => changePage('playlists')}>Playlist</button>
            {defaultPage === 'all' && <All />}
            {defaultPage === 'podcasts' && <Podcasts />}
            {defaultPage === 'artists' && <Artists />}
            {defaultPage === 'playlists' && <Playlist />}
          </div>
        </div>
      </div>
  )
}

export default Home