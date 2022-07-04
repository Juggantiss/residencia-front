import { useState } from "react";
import {
  HomeOutlined,
  UserOutlined,
  FormOutlined,
  QuestionCircleOutlined,
  MenuOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Breadcrumb, Layout, Menu, Button, Popconfirm, Avatar } from "antd";
import "../styles/Aspirant.modules.css";

import { useNavigate } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;
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
  let width = window.screen.width;
  const [collapsed, setCollapsed] = useState(width > 990 ? false : true);

  const logout = () => {
    window.localStorage.clear();
    navigate("/login");
  };

  return (
    <Layout className="layout-container">
      <Sider
        zeroWidthTriggerStyle={{
          display: "none"
        }}
        breakpoint="lg"
        collapsedWidth="0"
        collapsed={collapsed}
      >
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
        <Header>
          <ul className="ulLeft">
            <li>
              <MenuOutlined
                className="menuToggle"
                onClick={() => setCollapsed(!collapsed)}
              />
            </li>
            <li>
              <span className="tituloMenu">SSF CBTis 205</span>
            </li>
          </ul>
          <ul className="ulRight">
            <li>
              {width < 700 ? (
                !collapsed ? null : (
                  <span className="nameMenu">Juan Raul Martinez Lopez</span>
                )
              ) : (
                <span className="nameMenu">Juan Raul Martinez Lopez</span>
              )}
              {width < 380 ? (
                !collapsed ? null : (
                  <Avatar icon={<UserOutlined />} />
                )
              ) : (
                <Avatar icon={<UserOutlined />} />
              )}
            </li>
          </ul>
        </Header>
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
