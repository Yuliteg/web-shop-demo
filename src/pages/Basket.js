import EmptyContent from "../components/EmptyContent";
import emptyBasket from "../assets/shopping-cart.1021x1024.png";
import BasketTable from "../components/BasketTable";
import { Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";

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
    </>
  );
};

export default Basket;
