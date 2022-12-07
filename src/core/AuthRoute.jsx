import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../core";

export const AuthRouteComponent = ({ children, variant, admin }) => {
  const { auth } = useContext(AuthContext);
  const location = useLocation();
  const role = window.localStorage.getItem("role");
  let equals = false;

  if (role === variant || (role === "Administrador" && admin)) {
    equals = true;
  }

  if (!auth() || !equals) {
    return <Navigate to="/404" state={{ from: location }} />;
  }

  return children;
};
