import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (filters = {}, { rejectWithValue }) => {
    try {
      const { category, minPrice, maxPrice, search } = filters;

      let query = [];

      if (category) query.push(`category=${encodeURIComponent(category)}`);
      if (minPrice) query.push(`minPrice=${minPrice}`);
      if (maxPrice) query.push(`maxPrice=${maxPrice}`);
      if (search) query.push(`search=${encodeURIComponent(search)}`);

      const queryString = query.length ? `?${query.join("&")}` : "";

      const res = await axios.get(
        `http://localhost:3000/api/v1/products${queryString}`
      );

      return res.data.products;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    isLoading: false,
    products: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.products = [];
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;