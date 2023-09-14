import { Grid, styled } from "@mui/material";
import ProductCard from "./ProductCard";

const GridStyle = styled(Grid)(({ theme }) => ({
  marginTop: 1,
  marginBottom: theme.spacing(5),
  justifyContent: "center",
}));

const ProductList = ({ products }) => {
  return (
    <GridStyle container spacing={4}>
      {products.map((product) => (
        <Grid key={product.id} item xs={8} sm={5.5} lg={3}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </GridStyle>
  );
};

export default ProductList;
