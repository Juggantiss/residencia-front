import "../styles/registro/Register.modules.css";
import "dayjs/locale/es-mx";
import { useState } from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Col,
  Row,
  Radio,
  DatePicker
} from "antd";
import Home from "../layouts/Home";
import locale from "antd/es/date-picker/locale/es_ES";

const { Item } = Form;
const { Password } = Input;
const { Group } = Radio;

function Register() {
  const [valueRadio, setValueRadio] = useState(1);

  const onChangeRadio = (e) => {
    setValueRadio(e.target.value);
  };

  const formSuccess = (data) => {
    console.log(data);
  };

  const formFailed = (error) => {
    console.log(error);
  };

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 12
      },
      sm: {
        span: 8
      }
    },
    wrapperCol: {
      xs: {
        span: 4
      },
      sm: {
        span: 20
      }
    }
  };

  return (
    <Home>
      <Form
        name="form-register"
        initialValues={{
          name: ""
        }}
        onFinish={formSuccess}
        onFinishFailed={formFailed}
        {...formItemLayout}
      >
        <Item
          label="CURP"
          name={"curp"}
          rules={[
            {
              required: true,
              message: "Por favor ingresa tu curp"
            }
          ]}
        >
          <Input />
        </Item>
        <Item
          label="Nombre (s)"
          name={"name"}
          rules={[
            {
              required: true,
              message: "Por favor ingresa un nombre"
            }
          ]}
        >
          <Input />
        </Item>
        <Item
          label="Apellido Paterno"
          name={"firstLastName"}
          rules={[
            {
              required: true,
              message: "Por favor ingresa tu apellido paterno"
            }
          ]}
        >
          <Input />
        </Item>
        <Item
          label="Apellido Materno"
          name={"secondLastName"}
          rules={[
            {
              required: true,
              message: "Por favor ingresa tu apellido materno"
            }
          ]}
        >
          <Input />
        </Item>
        <Item
          label="Sexo"
          name={"gender"}
          rules={[
            {
              required: true,
              message: "Por favor ingresa tu sexo"
            }
          ]}
        >
          <Group
            onChange={onChangeRadio}
            value={valueRadio}
            name="radioGender"
            defaultValue={1}
          >
            <Radio value={1}>Hombre</Radio>
            <Radio value={2}>Mujer</Radio>
          </Group>
        </Item>
        <Item
          label="Año de Nacimiento"
          name={"dateBirth"}
          rules={[
            {
              required: true,
              message: "Por favor ingresa tu año de nacimiento"
            }
          ]}
        >
          <DatePicker className="datePicker" locale={locale} />
        </Item>
        <Item
          label="Teléfono"
          name={"phone"}
          rules={[
            {
              required: true,
              message: "Por favor ingresa tu número de teléfono"
            }
          ]}
        >
          <Input maxLength={10} />
        </Item>
        <Item
          label="Correo Electrónico"
          name={"email"}
          rules={[
            {
              required: true,
              message: "Por favor ingresa tu correo"
            }
          ]}
        >
          <Input />
        </Item>
        <Item
          label="Contraseña"
          name={"password"}
          rules={[
            {
              required: true,
              message: "Por favor ingresa una contraseña"
            }
          ]}
        >
          <Password />
        </Item>
        <Item
          label="Confirma la Contraseña"
          name={"password"}
          rules={[
            {
              required: true,
              message: "Por favor confirma tu contraseña"
            }
          ]}
        >
          <Password id="form-confirm_password" />
        </Item>
        <div className="items-bottom">
          <Item name="polities" valuePropName="checked" className="input">
            <Checkbox>Acepto las politicas de privacidad</Checkbox>
          </Item>
          <Item>
            <Button type="primary" htmlType="submit">
              Registrarse
            </Button>
          </Item>
        </div>
      </Form>
    </Home>
  );
}

export default Register;
