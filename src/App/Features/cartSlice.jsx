import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const exist = state.cartItems.find((x) => x._id === item._id);
      if (exist) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === item._id ? { ...x, quantity: x.quantity + 1 } : x
        );
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cartItems");
    },
    incrementQuantity: (state, action) => {
      const item = state.cartItems.find((x) => x._id === action.payload);
      if (item) item.quantity += 1;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decrementQuantity: (state, action) => {
      const item = state.cartItems.find((x) => x._id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
