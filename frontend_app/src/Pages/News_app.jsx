import React, { useState } from 'react'
import News_Navabr from '../Components/News_Navabr'
import NewsBoard from '../Components/NewsBoard'
import './CSS/news_app.css'
const News_app = () => {
    const [category,setCategory] = useState("general");
  return (
    <div>
        <News_Navabr setCategory={setCategory}/>
        <NewsBoard category={category}/>
    </div>
  )
}

export default News_app