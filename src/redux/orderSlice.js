import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  fetchOrderItemsForOrder,
  fetchOrders,
  createOrderAndItems,
} from "../api/ordersThunks";
import { baseUrl, company, tenant } from "../lib/constants";

const initialState = {
  orders: [],
  emptyOrders: false,
  loading: false,
  createdNewOrder: false,
  error: null,
};

export const createOrder = async (authToken, formData) => {
  const response = await axios.put(
    `${baseUrl}/api/public/${tenant}/pub/${company}/Order`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );

  return response.data.key;
};

export const sendOrderItemToServer = async (orderItems, authToken) => {
  try {
    for (const item of orderItems) {
      await axios.put(
        `${baseUrl}/api/public/${tenant}/pub/${company}/Order Item`,
        item,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
    }
  } catch (error) {
    throw error;
  }
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAndItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrderAndItems.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createOrderAndItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.emptyOrders = action.payload.length === 0;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchOrderItemsForOrder.fulfilled, (state, action) => {
        const orderIndex = state.orders.findIndex(
          (order) => order.key === action.meta.arg.orderKey
        );

        if (orderIndex !== -1) {
          state.orders[orderIndex].orderItems = action.payload;
        }
      });
  },
});

export default ordersSlice.reducer;
