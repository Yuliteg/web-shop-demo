import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch } from "react-redux";
import { addItemToBasket, removeItemFromBasket } from "../redux/basketSlice";

const ProductsTable = ({ productsData, isCheckout }) => {
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
    const totalPrice = productsData.reduce(
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
      <TableContainer component={Paper} sx={{ maxWidth: "950px" }}>
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
            {productsData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>${item.amount.toFixed(2)}</TableCell>
                <TableCell align="center">
                  <div
                    style={{ display: "flex", alignItems: "center", gap: "3%" }}
                  >
                    {!isCheckout && (
                      <RemoveIcon
                        sx={{ cursor: "pointer" }}
                        onClick={() => handleRemoveItem(item)}
                      />
                    )}
                    {item.quantity}
                    {!isCheckout && (
                      <AddIcon
                        sx={{ cursor: "pointer" }}
                        onClick={() => handleAddItem(item)}
                      />
                    )}
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
    </div>
  );
};

export default ProductsTable;
