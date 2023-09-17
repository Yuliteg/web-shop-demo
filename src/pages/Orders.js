import emptyOrder from "../assets/empty.1024x801.png";
import EmptyContent from "../components/EmptyContent";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import ProductsTable from "../components/ProductsTable";
import {
  Box,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { fetchOrderItemsForOrder, fetchOrders } from "../api/ordersThunks";

const Orders = () => {
  const { authToken } = useAuth();
  const dispatch = useDispatch();
  const { orders, emptyOrders, loading } = useSelector((state) => state.orders);

  const [orderItemsFetched, setOrderItemsFetched] = useState({});

  const fetchOrdersIfNeeded = useCallback(() => {
    if (!orders || orders.length === 0 || emptyOrders) {
      dispatch(fetchOrders(authToken));
    }
  }, [dispatch, authToken, emptyOrders]);

  useEffect(() => {
    fetchOrdersIfNeeded();
  }, [fetchOrdersIfNeeded]);

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

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="var(--minHeight)"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (emptyOrders) {
    return (
      <EmptyContent
        title="Your Orders"
        message="Your Orders is Empty"
        buttonText="Go Shopping"
        imgSrc={emptyOrder}
      />
    );
  }

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
                <ProductsTable productsData={order.orderItems} isCheckout />
              )}
            </Box>
          </Box>
        </div>
      ))}
    </Box>
  );
};

export default Orders;
