import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import AlbumDetails from './pages/AlbumDetails'

const App = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Home/>} />
      <Route path="/album/:id" element={<AlbumDetails/>}/>
    </Routes>
  )
}

export default App