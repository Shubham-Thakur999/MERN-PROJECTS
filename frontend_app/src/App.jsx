import React from 'react'
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Shop from "./Pages/Shop";
import ShopCategory from "./Pages/ShopCategory";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import LoginSignup from "./Pages/LoginSignup";
import Footer from "./Components/Footer/Footer";
import News_app from "./Pages/News_app";
import Gemini_clone from "./Pages/Gemini_clone";

//below we import banner images for men,women and kids category whivh will also be sent to the ShopCategory page along with category(ex: category="mens").
import men_banner from "./Components/assets/banner_mens.png";
import women_banner from "./Components/assets/banner_women.png";
import kid_banner from "./Components/assets/banner_kids.png";
import ContextProvider from './Context/Context';
import Youtube_clone from './Pages/Youtube_clone';
const App = () => {
  return (
    <div>

      <BrowserRouter>
        {/* <Navbar /> */}
        <ConditionalNavbar />
        <Routes>
          {/* below one's pathis "/" as we wish to keep it as our home page. */}
          <Route path="/" element={<Shop />} />

          {/* below apart from (category='mens') we are also sending another variable ( banner={men_banner} ) to the ShopCategory page to display all products of mens category and the image of men banner indidcating these are mens products. ALL THIS HAPPENS WHEN USER CLICKS ON NAVBAR ELEMENT (MEN) AND ALSO BECAUSE WE HAVE SET THE BELOW ROUTE. */}
          <Route
            path="/mens"
            element={<ShopCategory category="men" banner={men_banner} />}
          />
          {/* above along with the path and its corresponding element we also set the value of category variable to "mens" which will help users to route to mens component or section when they click on it.*/}
          <Route
            path="/womens"
            element={<ShopCategory category="women" banner={women_banner} />}
          />
          <Route
            path="/kids"
            element={<ShopCategory category="kid" banner={kid_banner} />}
          />
          <Route
            path="/News_app"
            element={<News_app/>}
          />
          <Route
            path="/gemini_clone"
            element={<Gemini_clone/>}
          />
          <Route
            path="/youtube_clone/*"
            element={<Youtube_clone/>}
          />

          {/* <Route path="/product" element={<Product />}>
            <Route path=":productId" element={<Product />} /> */}
          {/* above route takes you to the product page only but along with the received product id. */}
          {/* </Route>                                BELOW IS CORRECTED CODE BY CHATGPT*/}
          <Route path="/product/:ProductId" element={<Product />} />

          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup />} />
        </Routes>
        {/* <Footer /> */}
        <ConditionalFooter />
      </BrowserRouter>
    </div>
  )
}

const ConditionalNavbar = () => {
  const location = useLocation();
  return location.pathname !== '/news_app' && location.pathname !== '/gemini_clone' && location.pathname !== '/youtube_clone' && (!/^\/youtube_clone\/video\/\d+\/[a-zA-Z0-9_-]+$/.test(location.pathname) ? <Navbar /> : null)  ? <Navbar /> : null;
};

const ConditionalFooter = () => {
  const location = useLocation();
  return location.pathname !== '/news_app' && location.pathname !== '/gemini_clone' && location.pathname !== '/youtube_clone' && location.pathname !== '/login' && (!/^\/youtube_clone\/video\/\d+\/[a-zA-Z0-9_-]+$/.test(location.pathname) ? <Navbar /> : null)  ? <Footer /> : null;
};

export default App