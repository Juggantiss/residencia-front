import React from "react";
import { Layout } from "antd";
import "../styles/Home.modules.css";

const { Content, Footer } = Layout;

function Home({ children }) {
  return (
    <Layout className="layout">
      <Content className="content">{children}</Content>
      <Footer className="footer">
        Sistema de Solicitud de Fichas &copy; 2022 CBTIS 205
      </Footer>
    </Layout>
  );
}

export default Home;
