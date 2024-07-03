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
import Settings from './pages/Settings'
import UserPage from './pages/UsersPage/UserPage'
import ArtistRelated from './pages/ArtistRelated'
import ArtistAlbums from './pages/ArtistAlbums'
import ArtistSingles from './pages/ArtistSingles'
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
        <Route exact path='/settings' element={<Settings />} />
        <Route path="/artist/related/:id" element={<ArtistRelated />} />
        <Route path="/artist/albums:id" element={<ArtistAlbums />} />
        <Route path="/artist/singles:id" element={<ArtistSingles />} />
        {/* for Users */}
        <Route path="/users" element={<UserPage />} />
      </Routes>
    </React.StrictMode>
  )
}
export default App