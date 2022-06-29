import "../styles/registro/Register.modules.css";
import "dayjs/locale/es-mx";
import { useState } from "react";
import dayjs from "dayjs";
import { Form, Input, Button, Checkbox, Radio, DatePicker, Spin } from "antd";
import Home from "../layouts/Home";
import locale from "antd/es/date-picker/locale/es_ES";

import { REGISTER_INITIAL_STATE } from "../forms/states/register";
import { FORM_ITEM_LAYOUT } from "../utils/formItemLayout";
import { REGISTER_SCHEMA } from "../forms/schemas/register.schema";

const { Item } = Form;
const { Password } = Input;
const { Group } = Radio;

function Register() {
  const [loading, setLoading] = useState(false);
  const formSuccess = (data) => {
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
  };

  const formFailed = (error) => {
    console.log(error);
  };

  let myForm = (
    <Form
      name="form-register"
      initialValues={REGISTER_INITIAL_STATE}
      onFinish={formSuccess}
      onFinishFailed={formFailed}
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
      <Spin size="large" spinning={loading} tip="Validando...">
        {myForm}
      </Spin>
    </Home>
  );
}

export default Register;
