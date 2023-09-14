import { Box } from "@mui/material";
import emptyOrder from "../assets/empty.1024x801.png";
import EmptyContent from "../components/EmptyContent";

const orders = null;

const Orders = () => {
  if (!orders || !orders.length)
    return (
      <EmptyContent
        title="Your Orders"
        message="Your Orders is Empty"
        buttonText="Go Shopping"
        imgSrc={emptyOrder}
      />
    );
  return <Box>Full Orders</Box>;
};

export default Orders;
