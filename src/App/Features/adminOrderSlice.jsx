import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const fetchAllOrders = createAsyncThunk(
  "adminOrders/fetchAll",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get("https://fullstackecommers-backend-uerv.onrender.com/api/v1/all-orders", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const orders = data.orders.map((o) => ({
        ...o,
        orderStatus: o.orderStatus === "Delivered" ? "Delivered" : "Processing",
      }));

      return orders;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const markOrderDelivered = createAsyncThunk(
  "adminOrders/markDelivered",
  async (orderId, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.put(
        "https://fullstackecommers-backend-uerv.onrender.com/:id/delivered",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return {
        ...data.order,
        orderStatus: data.order.orderStatus === "Delivered" ? "Delivered" : "Processing",
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "adminOrders/deleteOrder",
  async (orderId, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete("https://fullstackecommers-backend-uerv.onrender.com/order/:id", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return orderId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const adminOrderSlice = createSlice({
  name: "adminOrders",
  initialState: { orders: [], isLoading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(markOrderDelivered.fulfilled, (state, action) => {
        const index = state.orders.findIndex((o) => o._id === action.payload._id);
        if (index !== -1) state.orders[index] = action.payload;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter((o) => o._id !== action.payload);
      });
  },
});

export default adminOrderSlice.reducer;
