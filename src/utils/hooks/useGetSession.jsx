import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dashboards } from "../rolesDashboard";

function useGetSession() {
  const navigate = useNavigate();
  let auth = false;
  const jwt = window.localStorage.getItem("jwt");
  const id = window.localStorage.getItem("id");
  const role = window.localStorage.getItem("role");

  useEffect(() => {
    if (jwt && id && role) {
      const result = dashboards.find((dash) => dash.role === role);
      if (result) {
        navigate(result.path);
      } else {
        navigate("/404");
      }
    }

    return;
  });

  return auth;
}

export default useGetSession;
