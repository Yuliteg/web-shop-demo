import {
  Badge,
  Box,
  IconButton,
  Typography,
  AppBar,
  Toolbar,
} from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";
import { NavLink } from "react-router-dom";

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
            <Box display="flex" alignItems="center">
              <Typography variant="h6" color="black" cursor="pointer">
                WebShop
              </Typography>
              <StoreIcon
                sx={{
                  ml: "5%",
                  color: "#5a2b89",
                  "&:active, &:visited": {
                    color: "#5a2b89",
                  },
                }}
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
