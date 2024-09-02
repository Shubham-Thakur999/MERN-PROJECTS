import React, { useEffect, useState } from 'react'
import './NewCollections.css'
//below we import new_collections.js file that contains info about new products. 
import new_collection from '../assets/new_collections'
import Item from '../Item/Item'
const NewCollections = () => {

  const [new_collection,setNew_collection] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:4000/newcollections').then((response)=>response.json()).then((data)=>setNew_collection(data))    
  },[])

  return (
    <div  className='new-collections'>
        <h1>NEW COLLECTIONS</h1>
        <hr />
        {/* same as we did in Popular.jsx here also we are displaying Newly added products with layout from (<Item/>) component and data from new_collection.jsx file. */}
        <div className="collections">
          {/* we already know map function is an array function that helps us to traverse through each product element of all_product array..  */}
            {new_collection.map((item,i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
            })}

        </div>

    </div>
  )
}

export default NewCollections