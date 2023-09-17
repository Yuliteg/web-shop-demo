import { Badge, Box, Typography, AppBar, Toolbar } from "@mui/material";
import { NavLink } from "react-router-dom";
import bagIcon from "../assets/bags.png";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { basketItems } = useSelector((state) => state.basket);

  const totalQuantity = basketItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <AppBar
      position="sticky"
      style={{
        background: "rgb(203 221 227)",
        height: "var(--navbar-height)",
      }}
    >
      <nav role="navigation" style={{ height: "100%" }}>
        <Toolbar
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            maxWidth: "1270px",
            margin: "0 auto",
          }}
        >
          <NavLink
            to="/"
            style={{ textDecoration: "none" }}
            data-testid="home-link"
          >
            <Box display="flex">
              <Typography variant="h6" color="black" cursor="pointer">
                WebShop
              </Typography>
              <img
                src={bagIcon}
                alt="Bag icon"
                style={{ width: "28px", height: "28px", marginLeft: "4px" }}
              />
            </Box>
          </NavLink>

          <Box display="flex" alignItems="center">
            <NavLink
              to="/basket"
              style={{ marginRight: "25px" }}
              data-testid="basket-link"
            >
              <Badge badgeContent={totalQuantity || "0"} color="success">
                <Typography
                  variant="h6"
                  color="textPrimary"
                  cursor="pointer"
                  marginRight="8px"
                  sx={{
                    transition: "text-decoration 0.2s",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  Basket
                </Typography>
              </Badge>
            </NavLink>

            <NavLink
              to="/orders"
              style={{ textDecoration: "none" }}
              data-testid="orders-link"
            >
              <Typography
                variant="h6"
                color="textPrimary"
                cursor="pointer"
                marginRight="6px"
                sx={{
                  transition: "text-decoration 0.2s",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Orders
              </Typography>
            </NavLink>
          </Box>
        </Toolbar>
      </nav>
    </AppBar>
  );
};

export default Navbar;
