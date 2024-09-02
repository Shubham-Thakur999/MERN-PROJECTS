import React, { useContext, useState,useRef } from 'react'
import './Navbar.css'
import logo from '../assets/logo.png'
import cart_icon from '../assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import nav_dropdown from '../assets/nav_dropdown.png'


const Navbar = () => {
    const [menu,setMenu] = useState("shop");
    //above we declare a state variable with initial value as "shop".
    //  I well understood how he made (clicking) the each navbar element as an individual state or avastha . He declared a state variable (menu) and its value changes as I click on different navbar elements(using onClick listener).for ex: if I click on men the state of menu is men, and by smartly adding the ternary(or conditional) operator he made the horizontal line to shift or added to the current state navbar element.

    const {getTotalCartItems}= useContext(ShopContext);
    //above we access a function(getTotalCartItems) from context(ShopContext).

    //below we create a reference variable for our nav menu using (useRef) .it'll help us display a hamburger icon instead of all nav items when screen width decreses a bit much. we'll link this reference to the <ul> tag of navbar list items using ref={menuRef} attribute.
    const menuRef = useRef();
    //below function will add the class('nav-menu-visible') to the classlist of <ul ref={menuRef}> element when someone clicks on the hamburger icon else it would remove it if already present. toggle function helps to switch between the 2 states i.e, to add or remove the class.
    const dropdown_toggle = (e) => {
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');
    }

  return (
    <div className='navbar'>
        <div className="nav-logo">
            <img src={logo} alt="" />
            <p>SHOPPER</p>
        </div>

        {/* below is the image of navbar hamburger menu icon that will be dispalyed when screen width reduces below 800px and function(dropdown_toggle)(defined above) will be called.this function will remove all nav list items and place thid imsge in its place. */}
        <img src={nav_dropdown} alt="" onClick={dropdown_toggle} className="nav-dropdown open" />

        <ul ref={menuRef} className="nav-menu">
            {/* like you can see below we have added an onClick listener to it and when we click on shop ,THE STATE VARIABLE GETS VALUE AS "shop".*/}
            <li onClick={()=>{setMenu("shop")}}><Link to={'/'}>Shop</Link>{menu==="shop"?<hr />:<></>} </li>
            {/* above is <hr/> or line  */}
            <li onClick={()=>{setMenu("mens")}}><Link to={'/mens'}>Men</Link>{menu==="mens"?<hr />:<></>}</li>
            {/* ALSO THE TERNARY OPERATOR((...)?..:..) JUST CHECKS IF THE STATE VARIABLE HAS THE VALUE AS THIS PARTICULAR NAV ELEMENT(menu==="mens"?  IN ABOVE CASE ) AND ASSIGNS AN <hr/> ELEMENT(our red line) AFTER IT IF IT IS AND JUST EMPTY TAG IF NOT. */}
            <li onClick={()=>{setMenu("womens")}}><Link to={'/womens'}>Women</Link>{menu==="womens"?<hr />:<></>}</li>
            <li onClick={()=>{setMenu("kids")}}><Link to={'/kids'}>kids</Link>{menu==="kids"?<hr />:<></>}</li>
           
        </ul>
        <Link to={'/news_app'}>News App</Link>
        <Link to={'/gemini_clone'}>Gemini clone</Link>
        <Link to={'/youtube_clone'}>Youtube clone</Link>

        <div className="nav-login-cart">
        {localStorage.getItem('auth-token') ? <button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>:
        <Link to={'/login'}><button>Login</button></Link>}
        <Link to={'/cart'}><img src={cart_icon} alt="" /></Link>
            
            <div className="nav-cart-count">{getTotalCartItems()}</div>
            
        </div>
    </div>
  )
}

export default Navbar