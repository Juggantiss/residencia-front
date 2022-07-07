import { useState } from "react";
import { Button, Form, Input, Select, Spin, message } from "antd";
import { SPECIALTY_SCHEMA } from "../../forms/schemas/aspirant.schema";

const { Item } = Form;
const { Option } = Select;

function FormSpecialty({ next, idAspirant }) {
  const [loading, setLoading] = useState(false);

  const onFinish = async (data) => {
    console.log(
      "🚀 ~ file: FormSpecialty.jsx ~ line 10 ~ onFinish ~ data",
      data
    );
  };

  return (
    <Form
      name="form_register"
      className="register-form"
      onFinish={onFinish}
      autoComplete="off"
      scrollToFirstError
      requiredMark={false}
    >
      <h1>Especialidad</h1>
      <Item
        label="Especialidad"
        name="specialty"
        rules={SPECIALTY_SCHEMA.specialty}
      >
        <Select
          style={{
            textAlign: "left"
          }}
          loading={loading}
          allowClear
          placeholder="Selecciona una especialidad"
        >
          <Option value="1">Informatica</Option>
          <Option value="2">Sistemas</Option>
          <Option value="3">Enfermeria</Option>
          <Option value="4">Administracion</Option>
          <Option value="5">Construccion</Option>
        </Select>
      </Item>
      <br />
      <h1>Escuela de Procedencia</h1>
      <Item
        label="Nombre"
        name="schoolProcedence"
        rules={SPECIALTY_SCHEMA.schoolProcedence}
      >
        <Input placeholder="Nombre de la escuela" />
      </Item>
      <br />
      <Button size="large" htmlType="submit" type="primary">
        Siguiente
      </Button>
      <Spin className="spin-layout" size="large" spinning={loading} />
    </Form>
  );
}

export default FormSpecialty;
