import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import AlbumDetails from './pages/AlbumDetails'
import Search from './pages/Search'
import GenreAlbum from './pages/GenreAlbums'
import SidebarA from './components/SidebarA'
import ArtistsDetails from './pages/ArtistsDetails'

const App = () => {
  return (
    <React.StrictMode>
      <div style={{ background: '#282424' }}>
        <SidebarA />
        <div className="leftBody" style={{ color: 'white' }}>
          <img src='/profile-picture.png' style={{backgroundColor: '#000000'}} className='absolute top-6 right-8 px-1 py-1 rounded-full h-10'></img><br/>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/album/:id" element={<AlbumDetails />} />
            <Route path="/search" element={<Search />} />
            <Route path="/albums/:genre" element={<GenreAlbum />} />
            <Route path="/artist/:id" element={<ArtistsDetails/>}/>
          </Routes>
        </div>
      </div>
    </React.StrictMode>
  )
}

export default App