import React, { useContext } from 'react'
import './ProductDispaly.css'
import star_icon from '../assets/star_icon.png'
import star_dull_icon from '../assets/star_dull_icon.png'
import { ShopContext } from '../../Context/ShopContext'
const ProductDispaly = (props) => {
    //as discussed in Breadcrum.jsx file below variable (product) will store the product received from Product page with or in the form of props.
    const {product} = props;

    //below we access the (addToCart) function from our context file (ShopContext).
    const {addToCart} = useContext(ShopContext);

  return (
    <div className='productdisplay'>
        <div className="productdisplay-left">
            <div className="productdisplay-img-list">
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
            </div>
            <div className="productdisplay-img">
                <img className='productdisplay-main-img' src={product.image} alt="" />
            </div>

        </div>
        <div className="productdisplay-right">
            <h1>{product.name}</h1>
            <div className="productdisplay-right-stars">
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_dull_icon} alt="" />
                <p>(122)</p>
            </div>
            <div className="productdisplay-right-prices">
                <div className="productdisplay-right-price-old">${product.old_price}</div>
                <div className="productdisplay-right-price-new">${product.new_price}</div>
            </div>
            <div className="productdisplay-right-description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio libero nihil rem magnam aliquid et nesciunt ratione quo nisi quas! Eaque illo tempora, velit ipsam commodi animi in molestias sit odit minima optio, nesciunt officia numquam officiis id reiciendis odio?
            </div>
            <div className="productdisplay-right-size">
                <h1>Select Size</h1>
                <div className="productdisplay-right-size">
                    <div>S</div>
                    <div>M</div>
                    <div>L</div>
                    <div>XL</div>
                    <div>XXL</div>
                </div>
            </div>
            {/* BELOW WE ADD A CLICK EVENT LISTENER TO OUR ADD TO CART BUTTON,THAT UPON CLICKING WILL RUN AN ARROW FUNCTION THAT IN TURN CALLS (addToCart) FUNCTION AND SEND THE PARTICULAR (product'S ID) WITH IT. */}
            <button onClick={()=>{addToCart(product.id)}}>ADD TO CART</button>
            <p className="productdisplay-right-category"><span>Category:</span>Women , T-shirt, Crop</p>
            <p className="productdisplay-right-category"><span>Tags:</span>Modern, Latest</p>

        </div>
    </div>
  )
}

export default ProductDispaly