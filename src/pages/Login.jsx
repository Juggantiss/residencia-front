import "../styles/Login.modules.css";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import Home from "../layouts/Home";
import { LOGIN_SCHEMA } from "../forms/schemas/login.schema";

const { Item } = Form;
const { Password } = Input;

function Login() {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Home>
      <Form name="form_login" className="login-form" onFinish={onFinish}>
        <h1>Inicio de Sesión</h1>
        <Item name="email" rules={LOGIN_SCHEMA.email}>
          <Input
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
          <a className="login-form-forgot" href="">
            Olvidé mi contraseña
          </a>
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
          O <a href="/">registrate como aspirante</a>
        </Item>
      </Form>
    </Home>
  );
}

export default Login;
