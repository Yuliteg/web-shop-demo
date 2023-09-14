import { Box, Typography, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import image from "../assets/404-page-not-found.png";

const NotFound = () => {
  return (
    <Box display="flex" alignItems="center" flexDirection="column" gap="4rem">
      <Typography variant="h4">Sorry, page not found!</Typography>
      <img src={image} alt="404 Page not found" style={{ maxWidth: "560px" }} />
      <Button to="/" variant="contained" component={RouterLink}>
        Go to Home
      </Button>
    </Box>
  );
};

export default NotFound;
