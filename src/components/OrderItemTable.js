import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const OrderItemTable = ({ orderItemData }) => {

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
            <TableRow key={orderItemData.id}>
              <TableCell>{orderItemData.name}</TableCell>
              <TableCell>${orderItemData.amount}</TableCell>
              <TableCell align="center">
                <div
                  style={{ display: "flex", alignItems: "center", gap: "3%" }}
                >
                  {orderItemData.quantity}
                </div>
              </TableCell>
              <TableCell>${}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <p>
        Total Price: <strong>${}</strong>
      </p>
    </div>
  );
};

export default OrderItemTable;
