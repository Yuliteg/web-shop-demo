import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import { routePaths } from "./routePaths";
import App from "../App";
import Orders from "../pages/Order";
import Basket from "../pages/Basket";

export const routes = createBrowserRouter([
  {
    path: routePaths.base,
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      { path: "basket", element: <Basket /> },
      { path: "orders", element: <Orders /> },
    ],
  },
]);
