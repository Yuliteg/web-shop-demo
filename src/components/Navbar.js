import {
  Badge,
  Box,
  IconButton,
  Typography,
  AppBar,
  Toolbar,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import bagIcon from "../assets/bags.png";

const Navbar = () => {
  return (
    <>
      <AppBar
        position="sticky"
        style={{
          background: "rgb(203 221 227)",
          height: "var(--navbar-height)",
        }}
      >
        <Toolbar
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mx: "3%",
          }}
        >
          <NavLink to="/" style={{ textDecoration: "none" }}>
            <Box display="flex">
              <Typography variant="h6" color="black" cursor="pointer">
                WebShop
              </Typography>
              <img
                src={bagIcon}
                alt="Bag icon"
                style={{ width: "28px", height: "28px" }}
              />
            </Box>
          </NavLink>

          <Box display="flex" alignItems="center">
            <IconButton
              component={NavLink}
              to="/basket"
              size="large"
              edge="start"
              sx={{ mr: 2 }}
            >
              <Badge badgeContent="0" color="success">
                <Typography
                  variant="h6"
                  color="#401c64"
                  cursor="pointer"
                  marginRight="8px"
                >
                  Basket
                </Typography>
              </Badge>
            </IconButton>

            <NavLink to="/orders" style={{ textDecoration: "none" }}>
              <Typography
                variant="h6"
                color="#401c64"
                cursor="pointer"
                marginRight="6px"
              >
                Orders
              </Typography>
            </NavLink>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
