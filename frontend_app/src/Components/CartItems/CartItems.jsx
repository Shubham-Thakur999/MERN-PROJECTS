import React, { useContext } from 'react'
import './CartItems.css' 
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../assets/cart_cross_icon.png'
import Cart from '../../Pages/Cart'


const CartItems = () => {

    //below we acesss all the data and functions for our cart page using context file Shopcontext.
    const {getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart} =  useContext(ShopContext);

  return (
    <div className='cartitems '>
        <div className="cartitems-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
        </div>
        <hr />
        {all_product.map((e)=>{
            //below we did a mistake of using (CartItems) and not (cartItems) and it was not working, CHATGPT FIXED IT.
            if(cartItems[e.id]>0){
                return <div>
                <div className="cartitems-format cartitems-format-main">
                    <img src={e.image} alt="" className='cartitems-product-icon'/>
                    <p>{e.name}</p>
                    <p>${e.new_price}</p>
                    {/* below button dispalys quantity of product */}
                    <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                    <p>${e.new_price*cartItems[e.id]}</p>
                    {/* see they applied on click listener on the remove from cart image, and when it runs it calls the (removeFromCart) function accessed above */}
                    <img src={remove_icon} alt="" onClick={()=>{removeFromCart(e.id)}}/>
                </div>
                <hr />
            </div>
            }
            return null;

        })}
        <div className="cartitems-down">
            <div className="cartitems-total">
                <h1>Cart Totals</h1>
                <div>
                    <div className="cartitems-total-item">
                        <p>Subtotal</p>
                        <p>${getTotalCartAmount()}</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <p>Shipping fee</p>
                        <p>Free</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <h3>Total</h3>
                        <h3>${getTotalCartAmount()}</h3>
                    </div>
                </div>
                <button>PROCEED TO CHECKOUT</button>
            </div>
            <div className="cartitems-promocode">
                <p>If you have a promo code enter it here</p>
                <div className="cartitems-promobox">
                    <input type="text" placeholder='promo code' />
                    <button>Submit</button>
                </div>
            </div>
        </div>

    
    </div>
  )
}

export default CartItems