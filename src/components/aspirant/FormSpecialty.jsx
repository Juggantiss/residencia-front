import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import { Button, Form, Input, Select, Spin, message } from "antd";

import { SPECIALTY_SCHEMA } from "../../forms/schemas/aspirant.schema";
import { GET_SPECIALTIES } from "../../graphql/queries";

const { Item } = Form;
const { Option } = Select;

function FormSpecialty({ next, idAspirant }) {
  const [loadingForm, setLoadingForm] = useState(false);
  const { data, loading, error } = useQuery(GET_SPECIALTIES);

  if (error) {
    return <h1>{error}</h1>;
  }

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
          {data &&
            data.specialties?.data?.map((specialty) => (
              <Option key={specialty.value} value={specialty.value}>
                {specialty.attributes.label}
              </Option>
            ))}
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
      <Spin className="spin-layout" size="large" spinning={loadingForm} />
    </Form>
  );
}

export default FormSpecialty;
