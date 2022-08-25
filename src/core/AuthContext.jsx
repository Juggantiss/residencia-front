import { createContext } from "react";

export const AuthContext = createContext({
  auth: false
});

export const AuthProvider = (props) => {
  const { children } = props;
  const jwt = window.localStorage.getItem("jwt");
  const id = window.localStorage.getItem("id");
  const role = window.localStorage.getItem("role");

  let auth = () => {
    if (jwt && id && role) {
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ auth }}>{children}</AuthContext.Provider>
  );
};
