import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

const AddressForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    ship_To_Address: "",
    ship_To_City: "",
    ship_To_Name: "",
    ship_To_Post_Code: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form onSubmit={(e) => onSubmit(e, formData)}>
      <Box
        sx={{
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
      </Box>
    </form>
  );
};

export default AddressForm;
