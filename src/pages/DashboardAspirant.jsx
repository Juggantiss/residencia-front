import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";

import { useNavigate } from "react-router-dom";

function DashboardAspirant() {
  const navigate = useNavigate();

  const logout = () => {
    window.localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Bienvenido Juan</h1>
      <Popconfirm
        title="¿Estás seguro？"
        onConfirm={logout}
        okText="Sí"
        cancelText="No"
        icon={
          <QuestionCircleOutlined
            style={{
              color: "red"
            }}
          />
        }
      >
        <Button type="primary" danger>
          Cerrar Sesión
        </Button>
      </Popconfirm>
    </div>
  );
}

export default DashboardAspirant;
