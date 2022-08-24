import "../styles/Login.modules.css";
import { useState } from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, Spin, Result, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Home from "../layouts/Home";

import { LOGIN_SCHEMA } from "../forms/schemas/login.schema";
import { loginUser } from "../api/login/loginUser";
import useGetSession from "../utils/hooks/useGetSession";

const { Item } = Form;
const { Password } = Input;

function Login() {
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();
  useGetSession();

  const showModal = () => {
    setResult(
      <Result
        status="error"
        title="Verifica tus datos"
        subTitle="Correo o contraseña incorrecta"
      />
    );
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const onFinish = async (data) => {
    if (loading) return;
    const { email, password } = data;
    console.log("🚀 ~ file: Login.jsx ~ line 38 ~ onFinish ~ data", data);
    setLoading(true);
    const response = await loginUser({ identifier: email, password });
    resultForResponse(response);
    console.log(
      "🚀 ~ file: Login.jsx ~ line 42 ~ onFinish ~ response",
      response
    );
    setLoading(false);
  };

  const resultForResponse = (response) => {
    if (!response.data) {
      showModal();
    } else {
      window.localStorage.setItem("jwt", response?.data?.jwt);
      window.localStorage.setItem("id", response?.data?.user?.id);
      navigate("personal/dashboard");
    }
  };

  return (
    <Home>
      <Modal
        visible={isModalVisible}
        closable={false}
        footer={
          <Button type="primary" onClick={handleOk}>
            Aceptar
          </Button>
        }
      >
        {result}
      </Modal>
      <Form name="form_login" className="login-form" onFinish={onFinish}>
        <h1>Inicio de Sesión</h1>
        <Item name="email" rules={LOGIN_SCHEMA.email}>
          <Input
            autoFocus
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Correo"
            size="large"
          />
        </Item>
        <Item name="password" rules={LOGIN_SCHEMA.password}>
          <Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Contraseña"
            size="large"
          />
        </Item>
        <Item>
          <Link className="login-form-forgot" to="/forgot-password">
            Olvidé mi contraseña
          </Link>
        </Item>

        <Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            size="large"
          >
            Iniciar Sesión
          </Button>
          <Link to="/">Registrate como aspirante</Link>
        </Item>
        <Spin className="spin-layout" size="large" spinning={loading} />
      </Form>
    </Home>
  );
}

export default Login;
