import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./App/Features/authSlice"; 

import   productsReducer from "./App/Features/productSlice"; 
import cartReducer from "./App/Features/cartSlice";
import orderReducer from "./App/Features/orderSlice";
import adminOrderReducer from "./App/Features/adminOrderSlice";   
import  adminProductReducer from "./App/Features/adminProductSlice";   




const store = configureStore({
  reducer: {
    
    auth: authReducer,  
      products:   productsReducer, 
    cart: cartReducer, 
     orders: orderReducer, 
      adminOrders: adminOrderReducer, 
      adminProducts: adminProductReducer,
  },
});

export default store;
