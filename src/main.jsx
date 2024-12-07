import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Create from "./Create.jsx";
import Editmovie from "./Editmovie.jsx";
import Dashboard from "./Dashboard.jsx";
import Playmovie from "./Playmovie.jsx";
import Login from "./Login.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/addmovie",
    element: <Create />,
  },
  {
    path: "/editmovie/:id",
    element: <Editmovie />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/playmovie/:id",
    element: <Playmovie />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
