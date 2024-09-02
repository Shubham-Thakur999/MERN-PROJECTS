import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import './CSS/ShopCategory.css'
import dropdown_icon from '../Components/assets/dropdown_icon.png'
import Item from '../Components/Item/Item'
import all_product from '../Components/assets/all_product'
//see like many places we give a counter variable parameter (props) to the below function when it has to receive some value from somewhere. IN THIS CASE IT WILL RECEIVE VALUES (EX: category="mens" AND banner={men_banner}) FROM THE ROUTES THAT WE HAVE SET WHEN A USER CLICKS ON THE GIVEN NAV ELEMENT(EX: MEN).
const ShopCategory = (props) => {

  //SEE THAT'S WE WERE TALKING ABOUT WHILE CREATING THE (ShopContext) CONTEXT, BELOW WE ACCESS THE (all_product OR all_product.js file) CONTAINING PRODUCTS OF VARIOUS CATEGORIES. THIS IS POSSIBLE AS WE HAD EARLIER CREATED A CONTEXT.
  const {all_product} = useContext(ShopContext);
  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12 </span> out of 36 products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>
      {/* below similar logic is used to display products as on homepage. */}
      <div className="shopcategory-products">
        {/* we already know map function is an array function that helps us to traverse through each product element of all_product array.*/}
        
        {all_product.map((item,i)=>{
          if(props.category===item.category){
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
          }
          else{
            return null;
          }
        })}
      </div>
      <div className="shopcategory-loadmore">
        Explore more
      </div>

    </div>
  )
}
export default ShopCategory

// we faced error ehile displaying product items category wise in ShopCategory page as the categories in all_product.js file were(men, women and kid) and the categories that we were sending from the Routes in App.js page were((mens, womens and kids). chatgpt helped to identify it and i fixed it.
