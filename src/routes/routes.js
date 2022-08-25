import Login from "../pages/Login";
import PageNotFound from "../pages/PageNotFound";
import Register from "../pages/Register";

export const routes = [
  {
    name: "Inicio",
    path: "/",
    element: <Register />
  },
  {
    name: "Not Found",
    path: "*",
    element: <PageNotFound />
  },
  {
    name: "Inicio Sesión",
    path: "login",
    element: <Login />
  }
];
