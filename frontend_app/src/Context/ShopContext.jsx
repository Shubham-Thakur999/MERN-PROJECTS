import React, { createContext} from 'react'
import { useEffect, useState  } from 'react';
import all_product from '../Components/assets/all_product'
import CartItems from '../Components/CartItems/CartItems';
//below we used createContext() method to cretae and initialise(with null value) our context named ShopContext.
export const ShopContext = createContext(null);


//below we have created a function that when called will create an empty cart. the (cart) is nothing but an object(collection of key value pairs), where keys will be product id's and values will be thier respective quantities.
const getDefaultCart = ()=>{
  //below we create an empty variable cart which is an object as stated above. 
  let cart = {};
  //we know the cart will be of the length of (all_product) so there will be same number of items or (key:value pairs) as the length of [all_product] array. now the for loop one by one intializes all  the (keys i.e, product id's) of our {cart} object. 
  // for (let index = 0; index < all_product.length+1; index++) {
  for (let index = 0; index < 300+1; index++) {
    //below statement initializes the cart item at index (index) i.e, the product id at index (index) with value 0. as the user adds more of the same product ,its count needs to increase or add up,so we are initializing the count variable with 0.
    cart[index] = 0;
    
  }
  return cart;
}


// then below we have created a function ShopContextProvider that takes or receives some parameter that we have represented ny props.
const ShopContextProvider = (props) => {

  const [all_product,setAll_product] = useState([]);

  //below we create a new state variable named (cartItems).the function's name for this variable is (setCartItems). its value is (getDefaultCart()) function that creates an empty cart as we alresdy discussed.
  const [cartItems,setCartItems] = useState(getDefaultCart());

  useEffect(()=>{
    fetch('http://localhost:4000/allproducts').then((response)=>response.json()).then((data)=>setAll_product(data));

    if(localStorage.getItem('auth-token')){
      fetch('http://localhost:4000/getcart',{
        method:'POST',
        headers:{
          Accept:'application/form-data',
          'auth-token':`${localStorage.getItem('auth-token')}`,
          'Content-type':'application/json',
        },
        body:"",
  }).then((response)=>response.json()).then((data)=>setCartItems(data));
  }
},[]);

  //BELOW ARE FUNCTIONS TO ADD OR REMOVE ITEMS TO AND FROM OUR CART. [CHAT GPT EXPLAINATION, BETTER TO GO TO CHATGPT AND DEE THERE ITSELF]::::::

//Certainly! Let's go through the code in greater detail.
// Function Definition:
// const addToCart = (itemId) => {
//   // function body
// }
// -const addToCart: This defines a constant function named addToCart.
// -(itemId): This specifies that the function takes one parameter called itemId. This parameter represents the unique identifier of the item that is being added to the cart.
// => { ... }: This syntax indicates that the function is an arrow function, which is a concise way to write functions in JavaScript.

// Function Body:
// setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
// setCartItems
// This function is likely a state updater function from React's useState hook.
// It is used to update the state of the cartItems, which is an object representing the items in the cart and their quantities.

// (prev) => { ... }
// This is an arrow function that takes one parameter, prev, which represents the previous state of the cart items.
// The function returns a new object that represents the updated state.

// { ...prev, [itemId]: prev[itemId] + 1 }
// This is the returned object, representing the new state of the cart items.
// { ...prev }: This is the object spread syntax. It creates a shallow copy of the previous state, prev, meaning it copies all key-value pairs from prev into the new object.
// If prev was { "item1": 2, "item2": 1 }, then { ...prev } will also be { "item1": 2, "item2": 1 }.
// [itemId]: prev[itemId] + 1:
// This syntax uses computed property names. itemId is used as a dynamic key.
// prev[itemId]: This accesses the quantity of the item with the given itemId from the previous state.
// + 1: This increments the quantity of that item by 1.
// For example, if itemId is "item1" and prev["item1"] is 2, then prev["item1"] + 1 will be 3.
// If the item is not yet in the cart (prev[itemId] is undefined), adding 1 to undefined will result in NaN (Not a Number). However, in the context of a shopping cart, it is typically expected that the function is called only for items that are already in the cart.
// Putting It All Together
// Function Call: When addToCart(itemId) is called with a specific itemId, the function begins execution.
// State Update: setCartItems is called with an updater function (prev) => { ... }.
// Creating New State:
// The updater function takes the previous state prev.
// It creates a new object that includes all items from prev.
// It updates the quantity of the item with the given itemId by incrementing it by 1.
  const addToCart = (itemId)=>{
    console.log('Adding to cart:', itemId);
    setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}));

    if(localStorage.getItem('auth-token')){
      fetch('http://localhost:4000/addtocart',{
        method:'POST',
        headers:{
          'Accept':'application/form-data',
          'auth-token':localStorage.getItem('auth-token'),
          'Content-type':'application/json',
        },
        body:JSON.stringify({"itemId":itemId}),
  }).then((response)=>response.json()).then((data)=>console.log(data));
}
  }
  //.....
  const removeFromCart = (itemId)=>{
    setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}));

    if(localStorage.getItem('auth-token')){
      fetch('http://localhost:4000/removefromcart',{
        method:'POST',
        headers:{
          Accept:'application/form-data',
          'auth-token':`${localStorage.getItem('auth-token')}`,
          'Content-type':'application/json',
        },
        body:JSON.stringify({"itemId":itemId}),
  }).then((response)=>response.json()).then((data)=>console.log(data));
    
}
  }

  //below we create a function to find or calculate the total cart amount.
  const getTotalCartAmount = () => {
    //below variable is initialized with 0 and it will be successively add the totral amount of all the products present in the cart at present and which gives us the total cart amount. 
    let totalAmount = 0;
    //as i have thought, below we are running a foreach loop on the (CartItems)(storing each of teh product id's anf thier count) , check which product has count greater then 0 and then add thier prices successively to get the total cart amount.
    for(const item in cartItems){
      //checking which product in the cart has count greaterr than 0. CartItem at item'th index(i.e, 0,1,2,...).
      if (cartItems[item]>0) {
        //below we have variable(itemInfo) that will store all the details of the product present in the array(all_product) having id(product.id) equal to (item i.e, 0,1,2,...) having count (cart item having count > 0 as checked by above if condition).
        let itemInfo = all_product.find((product)=>product.id===Number(item))
        totalAmount += itemInfo.new_price*cartItems[item];//price of 1 * count of that product
      }
    }
    
    return totalAmount;

  }

  //below is the function to count the total cart items and that will be used for displaying on top of cart icon in navbar section.(similar to above function)
  const getTotalCartItems = () => {
    let totalItem = 0;
    for(const item in cartItems){
      if (cartItems[item]>0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;

  }

  //READ THIS FIRST.....
  //below the value of our contextValue variable that it is going to share or return is nothing but our (all_product.js) file containg info about all products of various categories.
  const contextValue = {getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart,getTotalCartItems};
  //also we add another parameter or props (cartItems) to the context value of our context file so that all pages of our react app can access the cart data.
  //we also add addToCart and  removeFromCart functions so tyhat they can be accessed in all pages of our react app.
  //we passed function(getTotalCartAmount) to the context value so that we can access this function in our (cartItem) component for adding or this total cart amount to it.b
  return (
    //below it returns ShopContext with the value(contextValue) discussed above .
    <ShopContext.Provider value={contextValue}>
        {props.children}
    </ShopContext.Provider>

  )
}
// console.log(all_product);

export default ShopContextProvider