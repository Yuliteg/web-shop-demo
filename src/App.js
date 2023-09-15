import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme/theme";
import MainContainer from "./components/container/MainContainer";
import Footer from "./components/Footer";

function App() {
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <MainContainer>
        <Outlet />
      </MainContainer>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
