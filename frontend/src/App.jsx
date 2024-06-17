import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import AlbumDetails from './pages/AlbumDetails'
import Search from './pages/Search'
import GenreAlbum from './pages/GenreAlbums'
import SidebarA from './components/SidebarA'

const App = () => {
  return (
    <React.StrictMode>
      <div style={{ background: '#282424' }}>
        <SidebarA />
        <div className="leftBody" style={{ marginRight: '20px', color: 'white' }}>
          <h2 className='absolute top-6 right-8 px-4 py-1 bg-red-300 rounded-lg'>asdasd1</h2>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/album/:id" element={<AlbumDetails />} />
            <Route path="/search" element={<Search />} />
            <Route path="/albums/:genre" element={<GenreAlbum />} />
          </Routes>
        </div>
      </div>
    </React.StrictMode>
  )
}

export default App