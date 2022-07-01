import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";

import { useNavigate } from "react-router-dom";
import Aspirant from "../layouts/Aspirant";

function DashboardAspirant() {
  const navigate = useNavigate();

  const logout = () => {
    window.localStorage.clear();
    navigate("/login");
  };

  return (
    <Aspirant>
      <div style={{ textAlign: "center" }}>
        <h1>Bienvenido Aspirante</h1>
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
    </Aspirant>
  );
}

export default DashboardAspirant;
