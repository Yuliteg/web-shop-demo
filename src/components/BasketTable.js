import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch } from "react-redux";
import { addItemToBasket, removeItemFromBasket } from "../redux/basketSlice";

const BasketTable = ({ basketData }) => {
  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    dispatch(addItemToBasket(item));
  };

  const handleRemoveItem = (item) => {
    if (item.quantity > 1) {
      dispatch(removeItemFromBasket(item));
    } else {
      dispatch(removeItemFromBasket(item, { fullRemove: true }));
    }
  };

  const calculateSubtotal = (item) => {
    return (item.amount * item.quantity).toFixed(2);
  };

  const calculateTotal = () => {
    const totalPrice = basketData.reduce(
      (total, item) => total + item.amount * item.quantity,
      0
    );
    return totalPrice.toFixed(2);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <TableContainer component={Paper} sx={{ maxWidth: "850px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Product Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Price</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Quantity</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Subtotal</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basketData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>${item.amount.toFixed(2)}</TableCell>
                <TableCell align="center">
                  <div
                    style={{ display: "flex", alignItems: "center", gap: "3%" }}
                  >
                    <RemoveIcon
                      sx={{ cursor: "pointer" }}
                      onClick={() => handleRemoveItem(item)}
                    />
                    {item.quantity}
                    <AddIcon
                      sx={{ cursor: "pointer" }}
                      onClick={() => handleAddItem(item)}
                    />
                  </div>
                </TableCell>
                <TableCell>${calculateSubtotal(item)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <p>
        Total Price: <strong>${calculateTotal()}</strong>
      </p>
      <Button variant="contained" color="primary">
        Checkout
      </Button>
    </div>
  );
};

export default BasketTable;
