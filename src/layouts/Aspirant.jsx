import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import { FaWpforms } from "react-icons/fa";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { UserOutlined } from "@ant-design/icons";

import { Layout, Menu, Avatar } from "antd";
import BannerCbtis from "../assets/img/banner-cbtis.jpg";
import "../styles/Aspirant.modules.css";

import { useNavigate } from "react-router-dom";
import FormAspirant from "../pages/aspirant/FormAspirant";
import { GET_ASPIRANT_DATA } from "../graphql/queries";
import { Warning, Error } from "../components/Alerts";
import { Loading } from "../components/Loading";
import Profile from "../components/aspirant/Profile";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label
  };
}

const items = [
  getItem("Inicio", "1", <AiFillHome />),
  getItem("Formularios", "2", <FaWpforms />)
];

function Aspirant() {
  const navigate = useNavigate();
  let width = window.screen.width;
  let idUser = window.localStorage.getItem("id");
  const { data, loading, error } = useQuery(GET_ASPIRANT_DATA, {
    variables: { ID: idUser }
  });
  const [collapsed, setCollapsed] = useState(width > 990 ? false : true);
  const [content, setContent] = useState(
    <Profile id={idUser} cards showInfo />
  );

  const logout = () => {
    window.localStorage.clear();
    navigate("/login");
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    if (error?.networkError?.statusCode === 401) {
      return Error(
        "Upps... sesión expirada",
        "Por favor inicia sesión de nuevo",
        () => logout()
      );
    }
    return Error("Ah ocurrido un error al traer los datos", error?.message);
  }

  const handleClickLogout = () => {
    Warning("¿Estás seguro？", "", "Cerrar Sesión", logout);
  };

  const onClickMenuItem = (e) => {
    const { key } = e;
    if (key === "1") {
      setContent(<Profile id={idUser} cards showInfo />);
    }
    if (key === "2") {
      setContent(<FormAspirant data={data} />);
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
    const url = document?.data?.attributes?.photo?.data?.attributes?.url;
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
        <img className="logo" src={BannerCbtis} alt="logo" />
        <div className="text-button">
          <h1>ASPIRANTE</h1>
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys="1"
          mode="inline"
          items={items}
          onClick={onClickMenuItem}
        />
        <div className="divider" />
        <button
          className="btn btn-block btn-outline btn-error"
          onClick={handleClickLogout}
        >
          Cerrar Sesión
        </button>
      </Sider>
      <Layout className="site-layout">
        <Header>
          <ul className="ulLeft">
            <li>
              <AiOutlineMenu
                size={20}
                className="menuToggle mr-2"
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
