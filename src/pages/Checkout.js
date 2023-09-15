import React, { useState } from "react";
import { Box, Typography, TextField, Button, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import BasketTable from "../components/BasketTable";
import { useAuth } from "../context/authContext";
import { resetBasket } from "../redux/basketSlice";
import { Link } from "react-router-dom";
import { createOrderAndItems } from "../api/ordersThunks";

const Checkout = () => {
  const { authToken } = useAuth();
  const dispatch = useDispatch();
  const { basketItems } = useSelector((state) => state.basket);
  const [formData, setFormData] = useState({
    ship_To_Address: "",
    ship_To_City: "",
    ship_To_Name: "",
    ship_To_Post_Code: "",
  });
  const [finishOrder, setIsFinishOrder] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
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
        <Box display="flex" justifyContent="center" gap="1rem">
          <Typography variant="h6">You order is finish!</Typography>
          <Button variant="contained" component={Link} to="/orders">
            To orders
          </Button>
        </Box>
      )}
      {!finishOrder && (
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Address Form
            </Typography>
            <form
              onSubmit={handleSubmit}
              style={{
                backgroundColor: "#fff",
                padding: "16px",
                borderRadius: "8px",
              }}
            >
              <TextField
                label="Address"
                variant="outlined"
                fullWidth
                name="ship_To_Address"
                value={formData.ship_To_Address}
                onChange={handleChange}
                margin="normal"
                sx={{
                  "& input": { paddingTop: "11px" },
                }}
                required
              />
              <TextField
                label="City"
                variant="outlined"
                fullWidth
                name="ship_To_City"
                value={formData.ship_To_City}
                onChange={handleChange}
                margin="normal"
                sx={{
                  "& input": { paddingTop: "11px" },
                }}
                required
              />
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                name="ship_To_Name"
                value={formData.ship_To_Name}
                onChange={handleChange}
                margin="normal"
                sx={{
                  "& input": { paddingTop: "11px" },
                }}
                required
              />
              <TextField
                label="Postal Code"
                variant="outlined"
                fullWidth
                name="ship_To_Post_Code"
                value={formData.ship_To_Post_Code}
                onChange={handleChange}
                margin="normal"
                sx={{
                  "& input": { paddingTop: "11px" },
                }}
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ marginTop: "1rem" }}
              >
                Place Order
              </Button>
            </form>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Your Order
            </Typography>
            <BasketTable basketData={basketItems} isCheckout />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Checkout;
