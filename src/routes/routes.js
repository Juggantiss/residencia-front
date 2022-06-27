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
    element: <h1>Login</h1>
  },
  {
    name: "Registro",
    path: "registro",
    element: <h1>Registro</h1>
  },
  {
    name: "Dashboard",
    path: "dashboard",
    element: <h1>Dashboard</h1>
  }
];
