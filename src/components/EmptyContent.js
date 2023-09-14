import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

const EmptyContent = ({ title, message, buttonText, imgSrc }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Typography fontSize="30px" textAlign="center">
        {title} <ShoppingBasketIcon color="primary" />
      </Typography>
      <Box display="flex" alignItems="center" marginTop="2rem">
        <Typography variant="h5">{message}</Typography>
        <Button component={Link} to="/" variant="contained" sx={{ ml: "3rem" }}>
          {buttonText}
        </Button>
      </Box>
      <img
        src={imgSrc}
        alt="Icon"
        style={{ marginTop: "1rem", maxWidth: "350px" }}
      />
    </Box>
  );
};

export default EmptyContent;
