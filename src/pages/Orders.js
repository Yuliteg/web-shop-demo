import emptyOrder from "../assets/empty.1024x801.png";
import EmptyContent from "../components/EmptyContent";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderItemsForOrder, fetchOrders } from "../redux/orderSlice";
import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import BasketTable from "../components/BasketTable";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

const Orders = () => {
  const { authToken } = useAuth();
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orders);

  const [orderItemsFetched, setOrderItemsFetched] = useState({});

  useEffect(() => {
    if (!orders || orders.length === 0) {
      dispatch(fetchOrders(authToken));
    }
  }, [dispatch, authToken, orders]);

  useEffect(() => {
    if (orders && orders.length > 0) {
      orders.forEach((order) => {
        if (!orderItemsFetched[order.key] && !order.orderItems) {
          dispatch(fetchOrderItemsForOrder({ authToken, orderKey: order.key }));
          setOrderItemsFetched((prev) => ({
            ...prev,
            [order.key]: true,
          }));
        }
      });
    }
  }, [dispatch, authToken, orders, orderItemsFetched]);

  if (!orders || !orders.length)
    return (
      <EmptyContent
        title="Your Orders"
        message="Your Orders is Empty"
        buttonText="Go Shopping"
        imgSrc={emptyOrder}
      />
    );
  return (
    <Box display="flex" flexDirection="column" justifyContent="center">
      {orders.map((order, index) => (
        <div
          key={order.key}
          style={{ background: "white", marginBottom: "2rem" }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            textAlign="center"
            margin="1rem"
          >
            Order #{index + 1}
          </Typography>
          <Box display="flex" gap="0rem">
            <Box width="50%">
              <Typography
                variant="h6"
                marginTop="1rem"
                marginBottom="1rem"
                fontWeight="bold"
                textAlign="center"
              >
                Address Data:
              </Typography>
              <Box display="flex" flexDirection="column" alignItems="center">
                <List
                  sx={{
                    backgroundColor: "white",
                    maxWidth: "450px",
                    width: "70%",
                  }}
                >
                  <ListItem>
                    <ListItemText>
                      <Typography variant="body1">
                        <strong>Name:</strong> {order.ship_To_Name}
                      </Typography>
                    </ListItemText>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <Typography variant="body1">
                      <strong>Address:</strong> {order.ship_To_Address}
                    </Typography>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <Typography variant="body1">
                      <strong>Post Code:</strong> {order.ship_To_Post_Code}
                    </Typography>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <Typography variant="body1">
                      <strong>City:</strong> {order.ship_To_City}
                    </Typography>
                  </ListItem>
                  <Divider />
                </List>
              </Box>
            </Box>

            <Box width="60%" marginRight="1rem">
              <Typography
                variant="h6"
                textAlign="center"
                fontWeight="bold"
                marginTop="1rem"
                marginBottom="1rem"
              >
                Order Items:
              </Typography>
              {order.orderItems && (
                <BasketTable basketData={order.orderItems} isCheckout />
              )}
            </Box>
          </Box>
        </div>
      ))}
    </Box>
  );
};

export default Orders;
