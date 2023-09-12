import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import { routePaths } from "./routePaths";
import App from "../App";
import Order from "../pages/Order";

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
      { path: "order", element: <Order /> },
    ],
  },
]);
