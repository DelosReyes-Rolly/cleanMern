import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import AlbumDetails from './pages/AlbumDetails'
import Search from './pages/Search'
import GenreAlbum from './pages/GenreAlbums'
import SidebarA from './components/SidebarA'
import Artists from './pages/Artists'
import Podcasts from './pages/Podcasts'
import Playlist from './pages/Playlist'
import All from './pages/All'

const App = () => {
  return (
    <React.StrictMode>
      <div style={{ background: '#282424' }}>
        <SidebarA />
        <div className="leftBody" style={{ color: 'white' }}>
          <img src='/profile-picture.png' style={{backgroundColor: '#000000'}}className='absolute top-6 right-8 px-1 py-1 rounded-full h-10'></img><br/>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/album/:id" element={<AlbumDetails />} />
            <Route path="/search" element={<Search />} />
            <Route path="/albums/:genre" element={<GenreAlbum />} />
{/* 
            <Route path='/all' element={<All/>}/>
            <Route path='/artists' element={<Artists/>} />
            <Route path='/podcasts' element={<Podcasts/>} />
            <Route path='/playlists' element={<Playlist/>} /> */}
          </Routes>
        </div>
      </div>
    </React.StrictMode>
  )
}

export default App