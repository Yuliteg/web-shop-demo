import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
} from "@mui/material";

const BasketTable = ({ basketData }) => {
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
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <IconButton>-</IconButton>
                    {item.quantity}
                    <IconButton style={{ marginTop: "1px" }}>+</IconButton>
                  </div>
                </TableCell>
                <TableCell>${calculateSubtotal(item)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <p>Total Price: ${calculateTotal()}</p>
      <Button variant="contained" color="primary">
        Checkout
      </Button>
    </div>
  );
};

export default BasketTable;
