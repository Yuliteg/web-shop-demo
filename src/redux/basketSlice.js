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
    removeItemFromBasket: (state, action) => {
      const itemToRemove = action.payload;

      const itemIndex = state.basketItems.findIndex(
        (item) => item.id === itemToRemove.id
      );

      if (itemIndex !== -1) {
        if (action.payload.fullRemove) {
          state.basketItems.splice(itemIndex, 1);
        } else {
          if (state.basketItems[itemIndex].quantity > 1) {
            state.basketItems[itemIndex].quantity -= 1;
          } else {
            state.basketItems.splice(itemIndex, 1);
          }
        }
      }
    },
  },
});

export const { addItemToBasket, removeItemFromBasket } = basketSlice.actions;
export default basketSlice.reducer;
