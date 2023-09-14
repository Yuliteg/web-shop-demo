import {
  CardActions,
  Divider,
  Box,
  styled,
  Card,
  Typography,
  Button,
} from "@mui/material";
import { ShoppingCartOutlined } from "@mui/icons-material";
import productImg from "../assets/productImg/pexels-ylanite-koppens-1152665.jpg";
import { useDispatch } from "react-redux";
import { addItemToBasket } from "../redux/basketSlice";

const CardStyle = styled(Card)(({ theme }) => ({
  boxShadow: `0px 0px 4px rgba(145, 158, 171, 0.24), 0px 4px 8px -4px rgba(145, 158, 171, 0.24)`,
}));

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const { name, amount, imageUrl, description } = product;

  const addToBasket = () => {
    dispatch(addItemToBasket(product));
  };

  return (
    <CardStyle>
      <Box sx={{ pt: "100%", position: "relative" }}>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
          }}
          component="img"
          src={imageUrl || productImg}
          alt={name}
          loading="lazy"
        />
      </Box>

      <Box sx={{ py: 2, paddingBottom: 1, px: 1.5 }}>
        <Typography variant="subtitle1" noWrap fontWeight="bold">
          {name}
        </Typography>
        <Typography variant="subtitle1" sx={{ minHeight: "60px" }}>
          Description: {description}
        </Typography>
        <Divider />
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            mt: 1,
          }}
        >
          <Typography variant="subtitle2" fontSize="18px">
            ${amount}
          </Typography>
          <CardActions style={{ display: "flex", justifyContent: "center" }}>
            <Button
              size="small"
              variant="contained"
              color="success"
              endIcon={<ShoppingCartOutlined />}
              sx={{ fontSize: "12px" }}
              onClick={addToBasket}
            >
              Add to Basket
            </Button>
          </CardActions>
        </Box>
      </Box>
    </CardStyle>
  );
};

export default ProductCard;
