import React from 'react'
import { useEffect, useState  } from 'react';
import './Popular.css'
//below we import our data.js file that contains some info(id,name,image,old_price,etc.) about different products.
import data_product from '../assets/data'
import Item from '../Item/Item'
const Popular = () => {

  const [popularProducts,setPopularProducts] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:4000/popularinwomen').then((response)=>response.json()).then((data)=>setPopularProducts(data))    
  },[])

  return (
    <div className='popular'>
        <h1>POPULAR IN WOMEN</h1>
        <hr />
        {/* inside below div we wil render or produce our product items using data_product or data.js file. */}
        <div className="popular-item">
            {/* below we apply an method or function on the list of products within data.js file and it has parameter (item) to receive individual item from file and then return it as <Item/> component with all info(id,name,image,old_price,etc.) from it. */}
            {/* also we already know map function is an array function that helps us to traverse through each product element of all_product array..  */}
            {/* {data_product.map((item,i)=>{ */}
            {popularProducts.map((item,i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
                // as you can see above we are not only returning the <Item/> component that we've craeted for displaying individual product but also we are sending  product data from data.js file along with it to be displayed in the item component.
 
            })}
        </div>

    </div>
  )
}

export default Popular