import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./App/Features/authSlice"; 


const store = configureStore({
  reducer: {
    
    auth: authReducer,   
  },
});

export default store;
