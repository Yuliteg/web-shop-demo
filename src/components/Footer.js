import { Typography, Box } from "@mui/material";

const Footer = () => {
  return (
    <footer>
      <Box
        style={{
          backgroundColor: "#f5f5f5",
          height: "var(--footer-height)",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.4)",
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          height="100%"
          width="100%"
          justifyContent="center"
        >
          <Typography variant="body2" color="textSecondary">
            © {new Date().getFullYear()} WebShop. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </footer>
  );
};

export default Footer;
