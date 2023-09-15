import React, { useState } from "react";
import { Box, Typography, TextField, Button, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import BasketTable from "../components/BasketTable";

const Checkout = () => {
  const { basketItems } = useSelector((state) => state.basket);
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    name: "",
    postalCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Box>
      <Typography fontSize="30px" textAlign="center" marginBottom="2rem">
        Checkout
      </Typography>
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
              name="Address"
              value={formData.address}
              onChange={handleChange}
              margin="normal"
              sx={{ "& input": { paddingTop: "11px", paddingBottom: "14px" } }}
            />
            <TextField
              label="City"
              variant="outlined"
              fullWidth
              name="city"
              value={formData.city}
              onChange={handleChange}
              margin="normal"
              sx={{ "& input": { paddingTop: "11px", paddingBottom: "14px" } }}
            />
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              name="city"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
              sx={{ "& input": { paddingTop: "11px", paddingBottom: "14px" } }}
            />
            <TextField
              label="Postal Code"
              variant="outlined"
              fullWidth
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              margin="normal"
              sx={{ "& input": { paddingTop: "11px", paddingBottom: "14px" } }}
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
    </Box>
  );
};

export default Checkout;
