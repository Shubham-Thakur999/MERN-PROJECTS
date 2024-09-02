import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ContextProvider from './Context/Context.jsx'
import ShopContextProvider from './Context/ShopContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* by covering or surrounding <App> with our <ShopContextProvider> that we created earlier we are simply providing or making it possible to access the (all_product.js) file data in all the pages of our react app. */}
    <ShopContextProvider>
      <ContextProvider>
      <App />
      </ContextProvider>
    </ShopContextProvider>
  </React.StrictMode>,
)
