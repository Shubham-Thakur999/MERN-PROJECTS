import React from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'
import { useState } from 'react'
const AddProduct = () => {
  
  //below we declare a state varaible(image) and its calling function(setImage).it'll be used in a function to display the product image selected by user to upload. it is initialized with false value.
  const [image,setImage] = useState(false);  
  const imageHandler = (e) =>{
    //with this function when user selects an image that image will be added to the image state.(e.target) reprents the selected file and (e.target.files[0]) reprents the 1st image of multiple selected image files,as we usually add 5(1-big 4-samll) images for each product.
    setImage(e.target.files[0]);
  }

  //below we declare another state varaible(productDetails) and its calling function(setProductDetails).it is initialized with an object that has some keys and and empty string as values.
  const [productDetails,setProductDetails] = useState({
    name:"",
    image:"",
    category:"women",
    new_price:"",
    old_price:"",
  });
  const changeHandler = (e) =>{
  
    setProductDetails({...productDetails,[e.target.name]:e.target.value});
  } 
  
  //function to handle submittion on clcick of ADD button.
  const Add_Product=async ()=>{
    //first of all it prints all the product details that we've submitted through add product form in console.
    console.log(productDetails);
    let responseData;
    let product = productDetails;

    let formData = new FormData();
    formData.append('product',image);
    await fetch('http://localhost:4000/upload',{
      method:'POST',
      headers:{
        Accept:'application/json',
      },
      body:formData,
    }).then((resp) => resp.json()).then((data)=>{responseData=data});
    if (responseData.success) {
      product.image= responseData.image_url;
      console.log(product); 
      await fetch('http://localhost:4000/addproduct',{
        method:'POST',
        headers:{
          Accept:'application/json',
          'Content-type':'application/json',
        },
        body:JSON.stringify(product)
      }).then((resp)=>resp.json()).then((data)=>{
        data.success?alert("Product Added"):alert("Failed")
      })    
    }
  }

  return (
    <div className='add-product'>
              <div className="addproduct-itemfield">
                <p>Product title</p>
                <input type="text" name='name' placeholder='Type here' value={productDetails.name} onChange={changeHandler}/>
              </div>

              <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>Price</p>
                    <input type="text" name='old_price' placeholder='Type here' value={productDetails.old_price} onChange={changeHandler}/>
                </div>
                <div className="addproduct-itemfield">
                    <p>Offer Price</p>
                    <input type="text" name='new_price' placeholder='Type here' value={productDetails.new_price} onChange={changeHandler}/>
                </div>
              </div>
              <div className="addproduct-itemfield">
                <p>Product Category</p>
                <select name="category" className='add-product-selector' value={productDetails.category} onChange={changeHandler}>
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kid">kid</option>
                </select>
              </div>
              <div className="addproduct-itemfield">
                <label htmlFor="file-input">
                  {/* below is simple ternary operator. if (image)(our state variable) is (true) then uploaded image(URL.createObjectURL(image)) will be dispalyed or if (image)(our state variable) is (true) then our default (upload_area) image will be dispalyed.  */}
                    <img src={image?URL.createObjectURL(image):upload_area} className="addproduct-thumnail-img" />
                </label>
                {/* below we apply on change event listener to our image file input element that will call a function(imageHandler) which in turn will attach our image to a state variable(image) and help in dispalying it on screen.  */}
                <input onChange={imageHandler} type="file" name="image" id="file-input" hidden/>
              </div>
              <button className="addproduct-btn" onClick={()=>{Add_Product()}}>ADD</button>
    </div>
  )
}

export default AddProduct