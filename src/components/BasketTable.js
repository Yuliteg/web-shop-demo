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
                <TableCell>$Subtotal</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <p>Total Price: $Total</p>
      <Button variant="contained" color="primary">
        Checkout
      </Button>
    </div>
  );
};

export default BasketTable;
