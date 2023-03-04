import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client/react";
import { Button, Form, Input, Select } from "antd";

import { SPECIALTY_SCHEMA } from "../../forms/schemas/aspirant.schema";
import { GET_SPECIALTIES } from "../../graphql/queries";
import { addSpecialty } from "../../api/aspirant/addSpecialty";
import { Error, Info } from "../Alerts";
import { Loading } from "../Loading";

const { Item } = Form;
const { Option } = Select;

function FormSpecialty({ next, idAspirant }) {
  const [loadingForm, setLoadingForm] = useState(false);
  const { data, loading, error } = useQuery(GET_SPECIALTIES);

  useEffect(() => {
    Info(
      "QUINTO PASO",
      "Seleccione su especialidad deseada y proporcione el nombre de su escuela de procedencia.",
      () => {}
    );

    return () => {};
  }, []);

  if (error) {
    return Error("Ah ocurrido un error al traer los datos", error?.message);
  }

  const onFinish = async (data) => {
    console.log(
      "🚀 ~ file: FormSpecialty.jsx ~ line 10 ~ onFinish ~ data",
      data
    );
    setLoadingForm(true);
    const response = await addSpecialty(data, idAspirant);
    resultForResponse(response);
    console.log(
      "🚀 ~ file: FormSpecialty.jsx ~ line 26 ~ onFinish ~ response",
      response
    );
    setLoadingForm(false);
  };

  const resultForResponse = (response) => {
    if (response?.data) {
      next();
    }
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
        <Input
          placeholder="Nombre de la escuela"
          onInput={(e) =>
            (e.target.value = ("" + e.target.value).toUpperCase())
          }
        />
      </Item>
      <br />
      <Button size="large" htmlType="submit" type="primary">
        Siguiente
      </Button>
      {loading || (loadingForm && <Loading />)}
    </Form>
  );
}

export default FormSpecialty;
