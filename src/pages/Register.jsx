import "../styles/Register.modules.css";
import "dayjs/locale/es-mx";
import { useState } from "react";
import dayjs from "dayjs";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Radio,
  DatePicker,
  Spin,
  Result,
  Modal
} from "antd";
import Home from "../layouts/Home";
import locale from "antd/es/date-picker/locale/es_ES";

import { REGISTER_INITIAL_STATE } from "../forms/states/register";
import { FORM_ITEM_LAYOUT } from "../utils/formItemLayout";
import { REGISTER_SCHEMA } from "../forms/schemas/register.schema";
import { registerUser } from "../api/register/registerUser";

const { Item } = Form;
const { Password } = Input;
const { Group } = Radio;

function Register() {
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [result, setResult] = useState(null);

  const showModal = (resultData) => {
    setResult(
      <Result
        status={resultData.status}
        title={resultData.title}
        subTitle={resultData.subTitle}
      />
    );
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const formSuccess = async (data) => {
    const { curp, birthday } = data;
    data = {
      ...data,
      username: curp.toUpperCase(),
      curp: curp.toUpperCase(),
      birthday: dayjs(birthday).format("YYYY-MM-DD")
    };
    delete data.confirmPassword;
    delete data.polities;
    console.log(data);
    setLoading(true);
    const response = await registerUser(data);
    resultForResponse(response);
    console.log(response);
    setLoading(false);
  };

  const resultForResponse = (response) => {
    let resultData = null;
    if (!response.data) {
      resultData = {
        status: "error",
        title: "Lo sentimos ah ocurrido un error",
        subTitle: "Verifica los datos ingresados, e intenta nuevamente"
      };
    } else {
      resultData = {
        status: "success",
        title: "Se ha creado tu cuenta",
        subTitle:
          "Buenas noticias tu cuenta ha sido creada, ya puedes iniciar sesión"
      };
    }
    showModal(resultData);
  };

  let myForm = (
    <Form
      name="form_register"
      className="register-form"
      initialValues={REGISTER_INITIAL_STATE}
      onFinish={formSuccess}
      autoComplete="off"
      scrollToFirstError
      {...FORM_ITEM_LAYOUT}
    >
      <Item label="CURP" name="curp" rules={REGISTER_SCHEMA.curp}>
        <Input className="input-upper" maxLength={18} />
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
            Acepto las <a href="">políticas de privacidad.</a>
          </Checkbox>
        </Item>
        <Item>
          <Button type="primary" htmlType="submit">
            Registrarse
          </Button>
        </Item>
      </div>
    </Form>
  );

  return (
    <Home>
      <h1>Registro de Aspirante</h1>
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
      <Spin size="large" spinning={loading} tip="Validando...">
        {myForm}
      </Spin>
    </Home>
  );
}

export default Register;
