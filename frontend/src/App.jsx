import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import AlbumDetails from './pages/AlbumDetails'
import Search from './pages/Search'
import GenreAlbum from './pages/GenreAlbums'
import ArtistsDetails from './pages/ArtistsDetails'
import PodcastsDetails from './pages/PodcastsDetails'
import Signin from './components/Signin'
import Signup from './components/Signup'
import Profile from './pages/Profile'
const App = () => {

  return (
    <React.StrictMode>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/album/:id" element={<AlbumDetails />} />
        <Route path="/search" element={<Search />} />
        <Route path="/albums/:genre" element={<GenreAlbum />} />
        <Route path="/artist/:id" element={<ArtistsDetails />} />
        <Route path="/podcast/:id" element={<PodcastsDetails />} />
        <Route exact path="/signin" element={<Signin />} />
        <Route exact path='/signup' element={<Signup />} />
        <Route exact path='/profile' element={<Profile />} />
      </Routes>
    </React.StrictMode>
  )
} 
export default App