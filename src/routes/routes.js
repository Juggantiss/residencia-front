import Aspirant from "../layouts/Aspirant";
import FormAspirant from "../pages/aspirant/FormAspirant";
import Login from "../pages/Login";
import ListAspirant from "../pages/personal/ListAspirant";
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
  },
  {
    name: "Registro",
    path: "registro",
    element: <h1>Registro</h1>
  },
  {
    name: "Dashboard",
    path: "dashboard",
    element: <ListAspirant />
  },
  {
    name: "Formularios",
    path: "aspirant/forms",
    element: <FormAspirant />
  }
];
