import { useEffect } from "react";
import { useAuth } from "../context/authContext";
import { Typography, Box, Grid, CircularProgress } from "@mui/material";
import shopIcon from "../assets/shop.png";
import ProductList from "../components/ProductList";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productSlice";

const Home = () => {
  const { signin, authToken } = useAuth();
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    if (authToken === null && !localStorage.getItem("authToken")) {
      signin();
    }
    authToken && dispatch(fetchProducts(authToken));
  }, [authToken, signin, dispatch]);

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
        {loading ? (
          <Box
            display="flex"
            width="100%"
            justifyContent="center"
            marginTop={10}
          >
            <CircularProgress size="4rem" />
          </Box>
        ) : (
          products && <ProductList products={products} />
        )}
      </Grid>
    </Box>
  );
};

export default Home;
