import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Create from "./Create.jsx";
import Editmovie from "./Editmovie.jsx";
import Dashboard from "./Dashboard.jsx";
import Playmovie from "./Playmovie.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import ProtectedRoute from "./ProtectRoute.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute allowedRoles={["Admin", "User"]} element={<App />} />
    ),
  },
  {
    path: "/addmovie",
    element: <ProtectedRoute allowedRoles={["Admin"]} element={<Create />} />,
  },
  {
    path: "/editmovie/:id",
    element: (
      <ProtectedRoute allowedRoles={["Admin"]} element={<Editmovie />} />
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute allowedRoles={["Admin"]} element={<Dashboard />} />
    ),
  },
  {
    path: "/playmovie/:id",
    element: (
      <ProtectedRoute
        allowedRoles={["Admin", "User"]}
        element={<Playmovie />}
      />
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
