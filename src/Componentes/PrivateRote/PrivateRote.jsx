import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";


export const PrivateRoute = () => {
  const tokenArmazenado = localStorage.getItem("token");
  if (tokenArmazenado === "Autorizado") {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
};