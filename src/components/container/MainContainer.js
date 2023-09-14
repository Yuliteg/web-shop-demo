import { Container } from "@mui/material";

const MainContainer = ({ children }) => {
  return (
    <Container
      sx={{
        paddingTop: "3rem",
        maxWidth: "1300px",
        minHeight: "var(--minHeight)",
      }}
    >
      {children}
    </Container>
  );
};

export default MainContainer;
