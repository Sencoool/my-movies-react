import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Create from "./Create.jsx";
import Editmovie from "./Editmovie.jsx";
import Delete from "./Delete.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/createmovie",
    element: <Create />,
  },
  {
    path: "/editmovie/:id",
    element: <Editmovie />,
  },
  {
    path: "/deletemovie",
    element: <Delete />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
