import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function useGetSession() {
  const navigate = useNavigate();
  let auth = false;
  const jwt = window.localStorage.getItem("jwt");
  const id = window.localStorage.getItem("id");
  const role = window.localStorage.getItem("role");

  useEffect(() => {
    if (jwt && id && role) navigate("/personal/dashboard");

    return;
  });

  return auth;
}

export default useGetSession;
