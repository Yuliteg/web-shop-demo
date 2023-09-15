import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "http://webshopdemo.devweb.b-s.si";
const tenant = "WebShopDemo";
const company = "FLB";

const initialState = {
  orders: [],
  loading: false,
  createdNewOrder: false,
  error: null,
};

export const placeOrder = createAsyncThunk(
  "orders/placeOrder",
  async ({ formData, basketItems, authToken }, { dispatch }) => {
    try {
      const response = await axios.put(
        `${baseUrl}/api/public/${tenant}/pub/${company}/Order`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const orderLookup = response.data.key;

      const updatedBasketItems = basketItems.map((item) => ({
        ...item,
        order_Lookup: `${orderLookup}`,
      }));

      const orderItems = prepareOrderItems(updatedBasketItems);

      await sendOrderItemToServer(orderItems, authToken);

      dispatch(fetchOrders(authToken));

      return orderLookup;
    } catch (error) {
      console.error("Error:", error.message);
      throw error;
    }
  }
);

const prepareOrderItems = (basketItems) => {
  return basketItems.map((item) => ({
    item_Lookup: item.item_Lookup,
    order_Lookup: item.order_Lookup,
    quantity: item.quantity.toString(),
    total_Amount: item.total_Amount.toString(),
    amount: item.amount.toString(),
    name: item.name,
  }));
};

const sendOrderItemToServer = async (orderItems, authToken) => {
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

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (authToken) => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/public/${tenant}/pub/${company}/Order`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error:", error.message);
      throw error;
    }
  }
);

export const fetchOrderItemsForOrder = createAsyncThunk(
  "orders/fetchOrderItemsForOrder",
  async ({ authToken, orderKey }) => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/public/${tenant}/pub/${company}/Order Item?$filter=order_Lookup eq ${orderKey}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error:", error.message);
      throw error;
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(placeOrder.rejected, (state, action) => {
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
