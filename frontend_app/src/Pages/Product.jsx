import React, { useContext } from 'react'
import './CSS/Product.css'
import {ShopContext} from '../Context/ShopContext'
import { useParams } from 'react-router-dom';
import Breadcrum from '../Components/Breadcrums/Breadcrum';
import ProductDispaly from '../Components/ProductDisplay/ProductDispaly';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';
const Product = () => {
  //below we access the all_product array of product items with the help of context named (ShopContext),as discussed earlier in ShopCategory page.
  const {all_product} = useContext(ShopContext);

  //below variable (ProductId) will store the id of the product received from the Route in file App.js when a user clicks on any product . and  we'll use this same id to dispaly the full description of the particular product.
  const {ProductId} = useParams();
  //now below we access the actual product which is done by applying find() method on all_product array , where the counter parameter (e) represents a product of the array , and then if the id of the product received from the Route page that the user has clicked on matches with any product id in the   array it'll be stored in vavriable (product).
  const product = all_product.find((e)=>e.id===Number(ProductId))
  //Number used as (ProductId) is string.
   
  return (
    <div className='product'>
      {/* here we supply the clicked (product) to both the components to display respective details of the product.  */}
      <Breadcrum product={product}/>
      <ProductDispaly product={product}/>
      <DescriptionBox/>
      <RelatedProducts/>

    </div>
  )
}

export default Product