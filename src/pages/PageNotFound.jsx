import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  const logout = () => {
    window.localStorage.clear();
    navigate("/login");
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh"
      }}
    >
      <Result
        status="404"
        title="404"
        subTitle="Lo sentimos, esta página que buscas no existe."
        extra={
          <Button type="primary" onClick={logout}>
            Volver al inicio
          </Button>
        }
      />
    </div>
  );
};

export default PageNotFound;
