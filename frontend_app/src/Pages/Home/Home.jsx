import React from 'react'
import { useState } from 'react'
import Feed from '../../Components/youtube/Feed/Feed'
import Sidebar from '../../Components/youtube/Sidebar/Sidebar'
import './Home.css'

const Home = ({sidebar}) => {

  const [category,setCategory] = useState(0);


  return (
    <> 
    <Sidebar sidebar={sidebar} category={category} setCategory={setCategory}/>
    {/* the below div has an ternary operator that checks if the (sidebar state variable) has true value or not. if it has then no class("") is assigned else class('large-container') will be asssigned . and the styles for the class is defined in the css file. it also has another calss (container) */}
    <div className={`container ${sidebar?"":'large-container'}`}>
      <Feed category={category}/>
    </div>
    

    </>
  )
}

export default Home