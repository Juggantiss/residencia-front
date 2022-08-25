import { ApolloProvider } from "@apollo/client";
import { Route, Routes } from "react-router-dom";
import apolloSetup from "../api/apolloSetup";
import { routes } from "./routes";

import { AuthProvider, AuthRouteComponent } from "../core";

import Personal from "../layouts/Personal";
import Aspirant from "../layouts/Aspirant";

function App() {
  return (
    <ApolloProvider client={apolloSetup}>
      <AuthProvider>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
          <Route
            path="personal/home"
            element={
              <AuthRouteComponent variant="Departamento">
                <Personal />
              </AuthRouteComponent>
            }
          />
          <Route
            path="aspirant/home"
            element={
              <AuthRouteComponent variant="Aspirante">
                <Aspirant />
              </AuthRouteComponent>
            }
          />
        </Routes>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
