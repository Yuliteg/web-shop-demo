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
        itemInBasket.total_Amount = itemInBasket.amount * itemInBasket.quantity;
      } else {
        const newItemWithFields = {
          ...newItem,
          quantity: 1,
          item_Lookup: newItem.key,
          total_Amount: newItem.amount,
        };
        state.basketItems.push(newItemWithFields);
      }
    },
    removeItemFromBasket: (state, action) => {
      const itemToRemove = action.payload;

      const itemIndex = state.basketItems.findIndex(
        (item) => item.id === itemToRemove.id
      );

      const basketItem = state.basketItems[itemIndex];

      if (itemIndex !== -1) {
        if (action.payload.fullRemove) {
          state.basketItems.splice(itemIndex, 1);
        } else {
          if (basketItem.quantity > 1) {
            basketItem.quantity -= 1;
            basketItem.total_Amount =
              basketItem.amount * state.basketItems[itemIndex].quantity;
          } else {
            state.basketItems.splice(itemIndex, 1);
          }
        }
      }
    },
    resetBasket: (state) => {
      state.basketItems = [];
    }
  },
});

export const { addItemToBasket, removeItemFromBasket, resetBasket } =
  basketSlice.actions;
export default basketSlice.reducer;
