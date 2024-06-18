import React, { useState } from 'react'
import All from './All'
import Podcasts from './Podcasts'
import Artists from './Artists'
import Playlist from './Playlist'

const Home = () => {
  const [defaultPage, newPage] = useState('all')
  
  const changePage = (page) => {
    newPage(page)
  }
  
  return (
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
  )
}

export default Home
