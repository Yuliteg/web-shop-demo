import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const ConfirmationMessage = ({ title, message, buttonLabel, buttonTo }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      marginTop="5rem"
    >
      <Typography variant="h5" marginBottom="1rem">
        {title}
      </Typography>
      <Typography variant="body1">{message}</Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to={buttonTo}
        style={{ marginTop: "1.5rem" }}
      >
        {buttonLabel}
      </Button>
    </Box>
  );
};

export default ConfirmationMessage;
