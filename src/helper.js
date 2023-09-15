export const prepareOrderItems = (basketItems) => {
  return basketItems.map((item) => ({
    item_Lookup: item.item_Lookup,
    order_Lookup: item.order_Lookup,
    quantity: item.quantity.toString(),
    total_Amount: item.total_Amount.toString(),
    amount: item.amount.toString(),
    name: item.name,
  }));
};
