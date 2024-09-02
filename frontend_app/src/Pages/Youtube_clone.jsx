import React from 'react'
import './CSS/Youtube_clone.css'
import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from '../Components/youtube/Navbar/Navbar'
import Home from '../Pages/Home/Home'
import Video from '../Pages/Video/Video'
const Youtube_clone = () => {
  const [sidebar,setSidebar] = useState(true);
  return (
    <div>
      <Navbar setSidebar={setSidebar} />
      <Routes>
        <Route path='/' element={<Home sidebar={sidebar} />} />
        <Route path='/video/:categoryId/:videoId' element={<Video/>} />
      </Routes>

    </div>
  )
}

export default Youtube_clone