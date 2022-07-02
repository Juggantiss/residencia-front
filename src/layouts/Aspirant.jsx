import {
  HomeOutlined,
  UserOutlined,
  FormOutlined,
  QuestionCircleOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Breadcrumb, Layout, Menu, Button, Popconfirm } from "antd";
import "../styles/Aspirant.modules.css";

import { useNavigate } from "react-router-dom";

const { Content, Footer, Sider } = Layout;
const { Item } = Breadcrumb;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label
  };
}

const items = [
  getItem(<Link to="/dashboard">Inicio</Link>, "1", <HomeOutlined />),
  getItem(<Link to="/aspirant/forms">Formularios</Link>, "2", <FormOutlined />),
  getItem(<Link to="/aspirant/profile">Perfil</Link>, "3", <UserOutlined />)
];

function Aspirant({ children, path }) {
  const navigate = useNavigate();

  const logout = () => {
    window.localStorage.clear();
    navigate("/login");
  };

  return (
    <Layout className="layout-container">
      <Sider breakpoint="lg" collapsedWidth="0">
        <img
          className="logo"
          src={require("../assets/img/banner-cbtis.jpg")}
          alt="logo"
        />
        <div className="text-button">
          <h1>ASPIRANTE</h1>
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
            <Button className="btnClose" type="primary" danger size="large">
              Cerrar Sesión
            </Button>
          </Popconfirm>
        </div>
        {/* <div className="logo" /> */}
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        {/* <Header className="site-layout-background header-one" /> */}
        <Content className="content-container">
          <Breadcrumb className="breadcumb-container">
            {path &&
              path.map((item, index) => (
                <Item key={index} href={item.route}>
                  {item.name}
                </Item>
              ))}
          </Breadcrumb>
          <div className="site-layout-background header-two">{children}</div>
        </Content>
        <Footer className="footer-container">
          Sistema de Solicitud de Fichas &copy; 2022 CBTIS 205
        </Footer>
      </Layout>
    </Layout>
  );
}

export default Aspirant;
