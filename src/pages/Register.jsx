import "../styles/Register.modules.css";
import "dayjs/locale/es-mx";
import { useState } from "react";
import dayjs from "dayjs";
import { Form, Input, Button, Checkbox, Radio, DatePicker } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Home from "../layouts/Home";
import locale from "antd/es/date-picker/locale/es_ES";

import { REGISTER_INITIAL_STATE } from "../forms/states/register";
import { REGISTER_SCHEMA } from "../forms/schemas/register.schema";
import { registerUser } from "../api/register/registerUser";

import useGetSession from "../utils/hooks/useGetSession";
import { Loading } from "../components/Loading";
import { Success, Error, Info } from "../components/Alerts";

const { Item } = Form;
const { Password } = Input;
const { Group } = Radio;

function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useGetSession();

  Info(
    "BIENVENIDO AL SISTEMA DE SOLICITUD DE FICHAS DEL CBTIS 205",
    "A través de este sitio podrá solicitar su ficha de ingreso al plantel, este proceso consta de 7 pasos y concluirá cuando se le haya generado su ficha con todos los datos y la fotografía.",
    () => {
      Info(
        "PRIMER PASO: CREACION DE UNA CUENTA",
        "Empecemos por generar una cuenta para el seguimiento de su trámite. El correo y contraseña proporcionada le servirá para acceder a su cuenta desde este sitio. Anote y guárdelo.",
        () => {}
      );
    }
  );

  const formSuccess = async (data) => {
    if (loading) return;
    const { curp, birthday } = data;
    data = {
      ...data,
      username: curp.toUpperCase(),
      curp: curp.toUpperCase(),
      birthday: dayjs(birthday).format("YYYY-MM-DD")
    };
    delete data.confirmPassword;
    delete data.polities;
    console.log("🚀 ~ file: Register.jsx ~ line 63 ~ formSuccess ~ data", data);
    setLoading(true);
    const response = await registerUser(data);
    resultForResponse(response);
    console.log(response);
    setLoading(false);
  };

  const resultForResponse = (response) => {
    if (!response.data) {
      Error(
        "Lo sentimos ah ocurrido un error",
        "Verifica los datos ingresados, e intenta nuevamente.",
        () => {}
      );
    } else {
      Success(
        "SEGUNDO PASO: Se ha creado tu cuenta",
        "Buenas noticias tu cuenta ha sido creada, ya puedes iniciar sesión con tu correo electrónico y contraseña que registraste.",
        "Aceptar",
        () => navigate("/login")
      );
    }
  };

  return (
    <Home>
      <Form
        name="form_register"
        className="register-form"
        initialValues={REGISTER_INITIAL_STATE}
        onFinish={formSuccess}
        autoComplete="off"
        scrollToFirstError
        requiredMark={false}
      >
        <h1>Nuevo Aspirante</h1>
        <Item label="CURP" name="curp" rules={REGISTER_SCHEMA.curp}>
          <Input showCount autoFocus className="input-upper" maxLength={18} />
        </Item>
        <Item label="Nombre (s)" name="name" rules={REGISTER_SCHEMA.name}>
          <Input className="input-cap" maxLength={30} />
        </Item>
        <Item
          label="Apellido Paterno"
          name="firstLastName"
          rules={REGISTER_SCHEMA.firstLastName}
        >
          <Input className="input-cap" maxLength={50} />
        </Item>
        <Item
          label="Apellido Materno"
          name="secondLastName"
          rules={REGISTER_SCHEMA.secondLastName}
        >
          <Input className="input-cap" maxLength={50} />
        </Item>
        <Item label="Sexo" name="gender" rules={REGISTER_SCHEMA.gender}>
          <Group name="radioGender">
            <Radio value="Hombre">Hombre</Radio>
            <Radio value="Mujer">Mujer</Radio>
          </Group>
        </Item>
        <Item
          label="Año de Nacimiento"
          name="birthday"
          rules={REGISTER_SCHEMA.birthday}
        >
          <DatePicker className="datePicker" locale={locale} />
        </Item>
        <Item label="Teléfono" name="phone" rules={REGISTER_SCHEMA.phone}>
          <Input maxLength={10} />
        </Item>
        <Item
          label="Correo Electrónico"
          name="email"
          rules={REGISTER_SCHEMA.email}
        >
          <Input />
        </Item>
        <Item
          label="Contraseña"
          name="password"
          rules={REGISTER_SCHEMA.password}
          hasFeedback
        >
          <Password />
        </Item>
        <Item
          label="Confirma la Contraseña"
          name="confirmPassword"
          dependencies={["password"]}
          rules={REGISTER_SCHEMA.confirmPassword}
          hasFeedback
        >
          <Password />
        </Item>
        <div className="items-bottom">
          <Item
            name="polities"
            valuePropName="checked"
            className="input"
            rules={REGISTER_SCHEMA.polities}
          >
            <Checkbox>
              Acepto las
              <Link to="/privacy-policies"> políticas de privacidad.</Link>
            </Checkbox>
          </Item>
          <Item>
            <Button type="primary" htmlType="submit">
              Registrarse
            </Button>
          </Item>
        </div>
        ¿Ya tienes cuenta? <Link to="/login">Inicia Sesión</Link>
        {loading && <Loading />}
      </Form>
    </Home>
  );
}

export default Register;
