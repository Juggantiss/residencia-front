import {
  HomeOutlined,
  UserOutlined,
  FormOutlined,
  CloseCircleFilled
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import "../styles/Aspirant.modules.css";

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
  getItem("Inicio", "1", <HomeOutlined />),
  getItem("Formularios", "2", <FormOutlined />),
  getItem("Perfil", "3", <UserOutlined />),
  getItem("Cerrar Sesión", "4", <CloseCircleFilled />)
];

function Aspirant({ children }) {
  return (
    <Layout className="layout-container">
      <Sider breakpoint="lg" collapsedWidth="0">
        <img
          className="logo"
          src={require("../assets/img/banner-cbtis.jpg")}
          alt="logo"
        />
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
            <Item>Aspirante</Item>
            <Item>Inicio</Item>
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
