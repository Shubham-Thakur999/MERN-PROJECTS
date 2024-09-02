import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom'

// below (props) is counter variable or parameter which simply represents the product item received.
const Item = (props) => {
  return (
    <div className='item'>
        {/* below to dispaly particular product's image */}
        {/* a simple click event onClick={window.scrollTo(0,0)} takes us to top of the page by using window object window.scrollTo(0,0). */}
        <Link to={`/product/${props.id}`}><img onClick={window.scrollTo(0,0)} src={props.image} alt="" /></Link>
        {/* as you an see above we have added link to the product's image and when one clicks on it the routes will take you to the Product page that will display all info about this particular product. also we send the particular product's id as part of props(props.id). it'll be accessed in the product page using props only.   */}
        <p>{props.name}</p>
        <div className="item-prices">
            <div className="item-price-new">
              {/* below $ is just for price symbol of dollar */}
                ${props.new_price}
            </div>
            <div className="item-price-old">
            ${props.old_price}
            </div>
        </div>
        
    </div>
  )
}

export default Item