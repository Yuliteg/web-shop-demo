import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import basketReducer from "./basketSlice";
import ordersReducer from "./orderSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    basket: basketReducer,
    orders: ordersReducer,
  },
});

export default store;
