import { useEffect } from "react";
import { useAuth } from "../context/authContext";
import { Typography, Box, Grid } from "@mui/material";
import shopIcon from "../assets/shop.png";
import ProductList from "../components/ProductList";
import { productListData } from "../data/testData";

const Home = () => {
  const { signin, authToken } = useAuth();

  useEffect(() => {
    if (authToken === null && !localStorage.getItem("authToken")) {
      signin();
    }
  }, [authToken, signin]);

  return (
    <Box>
      <Typography textAlign="center" variant="h5">
        Welcome to our WebShop!{" "}
        <img src={shopIcon} style={{ width: "35px" }} alt="Shop icon" />
      </Typography>
      <Typography variant="h6" sx={{ marginTop: "2rem", fontWeight: "bold" }}>
        Our products:
      </Typography>
      <Grid item xs={12} md={9}>
        <ProductList products={productListData} />
      </Grid>
    </Box>
  );
};

export default Home;
