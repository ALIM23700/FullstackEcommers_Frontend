import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchAllProducts = createAsyncThunk(
  "adminProducts/fetchAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get('https://fullstackecommers-backend-uerv.onrender.com/api/v1/products');
      return data.products;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const createProduct = createAsyncThunk(
  "adminProducts/create",
  async (productData, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.post('https://fullstackecommers-backend-uerv.onrender.com/api/v1/create', productData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data.product;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "adminProducts/update",
  async ({ id, productData }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.put('https://fullstackecommers-backend-uerv.onrender.com/api/v1/update/${id}', productData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data.product;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "adminProducts/delete",
  async (id, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete('https://fullstackecommers-backend-uerv.onrender.com/api/v1/delete/${id}', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const adminProductSlice = createSlice({
  name: "adminProducts",
  initialState: { products: [], isLoading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.products.findIndex((p) => p._id === action.payload._id);
        if (index !== -1) state.products[index] = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = state.products.filter((p) => p._id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default adminProductSlice.reducer;
