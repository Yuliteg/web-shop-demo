import { createAsyncThunk } from "@reduxjs/toolkit";
import { prepareOrderItems } from "../helper";
import { createOrder, sendOrderItemToServer } from "../redux/orderSlice";
import axios from "axios";
import { baseUrl, company, tenant } from "../lib/constants";

export const createOrderAndItems = createAsyncThunk(
  "orders/createOrderAndItems",
  async ({ formData, basketItems, authToken }, { dispatch }) => {
    try {
      const orderLookup = await createOrder(authToken, formData);

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
