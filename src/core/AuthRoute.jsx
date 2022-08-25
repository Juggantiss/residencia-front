import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../core";

export const AuthRouteComponent = ({ children, variant }) => {
  const { auth } = useContext(AuthContext);
  const location = useLocation();
  const role = window.localStorage.getItem("role");
  let equals = false;

  if (role === variant) {
    equals = true;
  }

  if (!auth || !equals) {
    return <Navigate to="/404" state={{ from: location }} />;
  }

  return children;
};
