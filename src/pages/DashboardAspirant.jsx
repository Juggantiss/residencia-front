import { HomeOutlined } from "@ant-design/icons";

import Aspirant from "../layouts/Aspirant";

const path = [
  {
    name: <HomeOutlined />,
    route: "/dashboard"
  }
];

function DashboardAspirant() {
  return (
    <Aspirant path={path}>
      <div style={{ textAlign: "center" }}>
        <h1>Bienvenido Aspirante</h1>
      </div>
    </Aspirant>
  );
}

export default DashboardAspirant;
