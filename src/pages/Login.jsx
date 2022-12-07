import "../styles/Login.modules.css";
import { useState } from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import Home from "../layouts/Home";

import { LOGIN_SCHEMA } from "../forms/schemas/login.schema";
import { loginUser } from "../api/login/loginUser";
import useGetSession from "../utils/hooks/useGetSession";
import { Loading } from "../components/Loading";
import { useLazyQuery } from "@apollo/client";
import { GET_ME_DATA } from "../graphql/queries";
import { Error } from "../components/Alerts";

const { Item } = Form;
const { Password } = Input;

function Login() {
  const [loadingAction, setLoadingAction] = useState(false);
  const [getMe, { loading, error }] = useLazyQuery(GET_ME_DATA);
  useGetSession();

  // if (data) {
  //   window.localStorage.setItem("role", data?.me?.role?.name);
  //   navigate("/personal/dashboard");
  // }

  if (error) {
    return Error("Ah ocurrido un error al traer los datos", error?.message);
  }

  const onFinish = async (values) => {
    if (loadingAction) return;
    const { email, password } = values;
    console.log("🚀 ~ file: Login.jsx ~ line 38 ~ onFinish ~ data", values);
    setLoadingAction(true);
    const response = await loginUser({ identifier: email, password });
    resultForResponse(response);
    let { data } = await getMe();
    if (data) {
      console.log(data);
      window.localStorage.setItem("role", data?.me?.role?.name);
      window.location.reload();
      // navigate("/personal/dashboard");
    }
    console.log(
      "🚀 ~ file: Login.jsx ~ line 42 ~ onFinish ~ response",
      response
    );
    setLoadingAction(false);
  };

  const resultForResponse = (response) => {
    if (!response.data) {
      Error("Verifica tus datos", "Correo o contraseña incorrecta");
    } else {
      window.localStorage.setItem("jwt", response?.data?.jwt);
      window.localStorage.setItem("id", response?.data?.user?.id);
    }
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
        {loading || (loadingAction && <Loading />)}
      </Form>
    </Home>
  );
}

export default Login;
