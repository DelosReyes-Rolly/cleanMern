import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import AlbumDetails from './pages/AlbumDetails'
import Search from './pages/Search'
import GenreAlbum from './pages/GenreAlbums'
import SidebarA from './components/SidebarA'
import ArtistsDetails from './pages/ArtistsDetails'
import PodcastsDetails from './pages/PodcastsDetails'
import Dashboard from './components/Dashboard'
import Signin from './components/Signin'
import Signup from './components/Signup'

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
            <Route path="/podcast/:id" element={<PodcastsDetails/>}/>
            <Route exact path="/signin" element={<Signin/>} />
            <Route exact path='/signup' element={<Signup/>} />
          </Routes>
        </div>
      </div>
    </React.StrictMode>
  )
}

export default App