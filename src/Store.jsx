import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./App/Features/authSlice"; 

import   productsReducer from "./App/Features/productSlice"; 
import cartReducer from "./App/Features/cartSlice"; 


const store = configureStore({
  reducer: {
    
    auth: authReducer,  
      products:   productsReducer, 
    cart: cartReducer, 
  },
});

export default store;
