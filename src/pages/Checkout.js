import React, { useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ProductsTable from "../components/ProductsTable";
import { useAuth } from "../context/authContext";
import { createOrderAndItems } from "../api/ordersThunks";
import ConfirmationMessage from "../components/ConfirmationMessage";
import AddressForm from "../components/AddressForm";
import { resetBasket } from "../redux/basketSlice";

const Checkout = () => {
  const { authToken } = useAuth();
  const dispatch = useDispatch();
  const { basketItems } = useSelector((state) => state.basket);
  const [finishOrder, setIsFinishOrder] = useState(false);

  const handleAddressFormSubmit = (e, formData) => {
    e.preventDefault();

    dispatch(createOrderAndItems({ formData, basketItems, authToken }));
    dispatch(resetBasket());
    setIsFinishOrder(true);
  };

  return (
    <Box>
      <Typography fontSize="30px" textAlign="center" marginBottom="2rem">
        Checkout
      </Typography>
      {finishOrder && (
        <ConfirmationMessage
          title="Thank you for your order! Your order has been received."
          message="We will process your order and contact you as soon as possible."
          buttonLabel="View Orders"
          buttonTo="/orders"
        />
      )}
      {!finishOrder && (
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Address Form
            </Typography>
            <AddressForm onSubmit={handleAddressFormSubmit} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Your Order
            </Typography>
            <ProductsTable productsData={basketItems} isCheckout />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Checkout;
