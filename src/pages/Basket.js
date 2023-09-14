import EmptyContent from "../components/EmptyContent";
import emptyBasket from "../assets/shopping-cart.1021x1024.png";
import BasketTable from "../components/BasketTable";
import { Typography } from "@mui/material";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

const basketTest = null;

const Basket = () => {
  if (!basketTest || basketTest.length === 0)
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
        Basket <ShoppingBasketIcon color="primary" />
      </Typography>
      <BasketTable basketData={basketTest} />
    </>
  );
};

export default Basket;
