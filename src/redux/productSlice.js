import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import createApiAgent from "../api/agent";

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const apiAgent = createApiAgent();

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (token) => {
    try {
      return apiAgent.getProducts(token);
    } catch (error) {
      throw error;
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setProducts, setLoading, setError } = productSlice.actions;
export default productSlice.reducer;
