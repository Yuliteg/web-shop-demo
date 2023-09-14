import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  basketItems: [],
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addItemToBasket: (state, action) => {
      const newItem = action.payload;
      const itemInBasket = state.basketItems.find(
        (item) => item.id === newItem.id
      );

      if (itemInBasket) {
        itemInBasket.quantity += 1;
      } else {
        state.basketItems.push({ ...newItem, quantity: 1 });
      }
    },
  },
});

export const { addItemToBasket } = basketSlice.actions;
export default basketSlice.reducer;
