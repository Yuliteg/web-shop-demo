import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import { routePaths } from "./routePaths";
import App from "../App";
import Orders from "../pages/Order";
import Basket from "../pages/Basket";
import MainContainer from "../components/container/MainContainer";
import Checkout from "../pages/Checkout";

export const routes = createBrowserRouter([
  {
    path: routePaths.base,
    element: <App />,
    errorElement: (
      <MainContainer>
        <NotFound />
      </MainContainer>
    ),
    children: [
      {
        path: "",
        element: <Home />,
      },
      { path: "basket", element: <Basket /> },
      { path: "checkout", element: <Checkout /> },
      { path: "orders", element: <Orders /> },
    ],
  },
]);
