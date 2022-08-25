import Login from "../pages/Login";
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
    element: <h1>404 Esta pagina no existe</h1>
  },
  {
    name: "Inicio Sesión",
    path: "login",
    element: <Login />
  }
];
