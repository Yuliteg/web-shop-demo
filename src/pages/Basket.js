import EmptyContent from "../components/EmptyContent";
import emptyBasket from "../assets/shopping-cart.1021x1024.png";
import BasketTable from "../components/BasketTable";
import { Box, Button, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Basket = () => {
  const { basketItems } = useSelector((state) => state.basket);

  if (!basketItems || basketItems.length === 0)
    return (
      <EmptyContent
        title="Your Basket"
        message="Your Basket is Empty"
        buttonText="Go Shopping"
        imgSrc={emptyBasket}
      />
    );

  return (
    <>
      <Typography fontSize="30px" textAlign="center" marginBottom="2rem">
        Basket <ShoppingCartIcon color="primary" />
      </Typography>
      <BasketTable basketData={basketItems} />

      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        marginTop="2rem"
      >
        <Button
          component={Link}
          to="/checkout"
          variant="contained"
          color="primary"
        >
          Checkout
        </Button>
      </Box>
    </>
  );
};

export default Basket;
