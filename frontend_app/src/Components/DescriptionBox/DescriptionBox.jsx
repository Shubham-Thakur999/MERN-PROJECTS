import React from 'react'
import './DescriptionBox.css'
const DescriptionBox = () => {
  return (
    <div className='descriptionbox '>
        <div className="descriptionbox-navigator">
            <div className="descriptionbox-nav-box">Description</div>
            <div className="descriptionbox-nav-box fade" >Reviews (122)
            </div>
        </div>
        <div className="descriptionbox-description">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel pariatur dolor maxime assumenda, est soluta facere iste ad repudiandae possimus qui, aliquam perspiciatis eligendi voluptatem molestias? Quasi magnam quae a eaque, cupiditate quis magni optio aspernatur, iure consectetur, beatae ratione!
                </p>
                <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut accusamus atque nobis modi velit provident inventore voluptas dignissimos hic voluptatibus?
                </p>
            </div>
    </div>
  )
}

export default DescriptionBox