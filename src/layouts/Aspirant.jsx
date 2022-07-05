import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import {
  HomeOutlined,
  UserOutlined,
  FormOutlined,
  QuestionCircleOutlined,
  MenuOutlined
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, Button, Popconfirm, Avatar } from "antd";
import "../styles/Aspirant.modules.css";

import { useNavigate } from "react-router-dom";
import FormAspirant from "../pages/aspirant/FormAspirant";
import DashboardAspirant from "../pages/aspirant/DashboardAspirant";
import { GET_ASPIRANT_DATA } from "../graphql/queries";

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
  getItem("Inicio", "1", <HomeOutlined />),
  getItem("Formularios", "2", <FormOutlined />),
  getItem("Perfil", "3", <UserOutlined />)
];

function Aspirant() {
  const navigate = useNavigate();
  let width = window.screen.width;
  let idUser = window.localStorage.getItem("id");
  const { data, loading, error } = useQuery(GET_ASPIRANT_DATA, {
    variables: { ID: idUser }
  });
  const [collapsed, setCollapsed] = useState(width > 990 ? false : true);
  const [content, setContent] = useState(<DashboardAspirant />);
  const [path, setPath] = useState("Inicio");

  if (loading) {
    return <h1>Cargando...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  const logout = () => {
    window.localStorage.clear();
    navigate("/login");
  };

  const onClickMenuItem = (e) => {
    const { key } = e;
    const { label } = items[key - 1];
    setPath(label);
    if (key === "1") {
      setContent(<DashboardAspirant />);
    }
    if (key === "2") {
      setContent(<FormAspirant data={data} />);
    }
    if (key === "3") {
      setContent(<h1>Este es tu perfil</h1>);
    }
  };

  const getFullName = () => {
    const { name, firstLastName, secondLastName } =
      data?.usersPermissionsUser?.data?.attributes;
    let fullName = `${name} ${firstLastName} ${secondLastName}`;

    return fullName;
  };

  const getImageProfile = () => {
    const document =
      data?.usersPermissionsUser?.data?.attributes?.aspirant?.data?.attributes
        ?.document;
    const url = document?.data?.attributes?.url;
    if (url) {
      return <Avatar src={url} />;
    } else {
      return <Avatar icon={<UserOutlined />} />;
    }
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
        <Menu
          theme="dark"
          defaultSelectedKeys="1"
          mode="inline"
          items={items}
          onClick={onClickMenuItem}
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
                  <span className="nameMenu">{getFullName()}</span>
                )
              ) : (
                <span className="nameMenu">{getFullName()}</span>
              )}
              {width < 380
                ? !collapsed
                  ? null
                  : getImageProfile()
                : getImageProfile()}
            </li>
          </ul>
        </Header>
        <Content className="content-container">
          <Breadcrumb className="breadcumb-container">
            <Item>
              <HomeOutlined />
            </Item>
            <Item>{path}</Item>
          </Breadcrumb>
          <div className="site-layout-background header-two">{content}</div>
        </Content>
        <Footer className="footer-container">
          Sistema de Solicitud de Fichas &copy; 2022 CBTIS 205
        </Footer>
      </Layout>
    </Layout>
  );
}

export default Aspirant;
