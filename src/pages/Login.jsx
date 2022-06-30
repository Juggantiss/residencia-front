import "../styles/Login.modules.css";
import { useState } from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, Spin } from "antd";
import { Link } from "react-router-dom";
import Home from "../layouts/Home";

import { LOGIN_SCHEMA } from "../forms/schemas/login.schema";

const { Item } = Form;
const { Password } = Input;

function Login() {
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    if (loading) return;
    setLoading(true);
    console.log("Received values of form: ", values);
  };

  return (
    <Home>
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
