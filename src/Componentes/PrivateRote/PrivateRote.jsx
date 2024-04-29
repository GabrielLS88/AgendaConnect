import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";



export const PrivateRoute = () => {
  let signed  = false;
  const tokenArmazenado = localStorage.getItem("token");
  if (tokenArmazenado == "Autorizado") {
    signed = true;
    console.log(tokenArmazenado)
    return signed ? <Outlet /> : <Navigate to="/" />;
  }
};