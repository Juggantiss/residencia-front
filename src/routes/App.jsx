import { ApolloProvider } from "@apollo/client";
import { Route, Routes } from "react-router-dom";
import apolloSetup from "../api/apolloSetup";
import { routes } from "./routes";

function App() {
  return (
    <ApolloProvider client={apolloSetup}>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </ApolloProvider>
  );
}

export default App;
