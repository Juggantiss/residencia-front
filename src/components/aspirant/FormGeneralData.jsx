import { useState } from "react";
import { Button, Form, Input, Switch } from "antd";
import { DATA_GENERAL_SCHEMA } from "../../forms/schemas/aspirant.schema";
import { DATA_GENERAL_INITIAL_STATE } from "../../forms/states/aspirant";
import { addAddress } from "../../api/aspirant/addAddress";
import { Loading } from "../Loading";
import { Error } from "../Alerts";

const { Item } = Form;

function FormGeneralData({ next, idAspirant }) {
  const [loading, setLoading] = useState(false);
  const [disabledInput, setDisabledInput] = useState(false);

  const onFinish = async (data) => {
    console.log(
      "🚀 ~ file: FormGeneralData.jsx ~ line 11 ~ onSubmit ~ data",
      data
    );
    data = {
      ...data,
      number:
        disabledInput || data.number.length < 1 ? 0 : parseInt(data.number),
      aspirant: idAspirant
    };
    console.log(data);
    setLoading(true);
    const response = await addAddress(data);
    resultForResponse(response);
    console.log(
      "🚀 ~ file: FormGeneralData.jsx ~ line 28 ~ onFinish ~ response",
      response
    );
    setLoading(false);
  };

  const resultForResponse = (response) => {
    if (response?.data) {
      next();
    } else {
      Error(
        "Lo sentimos",
        "Ah ocurrido un error al registrar los datos generales",
        () => {}
      );
    }
  };

  return (
    <Form
      name="form_register"
      className="register-form"
      initialValues={DATA_GENERAL_INITIAL_STATE}
      onFinish={onFinish}
      autoComplete="off"
      scrollToFirstError
      requiredMark={false}
    >
      <h1>Domicilio</h1>
      <Item label="Calle" name="street" rules={DATA_GENERAL_SCHEMA.street}>
        <Input autoFocus />
      </Item>
      <Item label="Número" name="number" rules={DATA_GENERAL_SCHEMA.number}>
        <Input
          disabled={disabledInput}
          addonBefore={
            <Switch
              checkedChildren="S/N"
              unCheckedChildren="S/N"
              onChange={() => setDisabledInput(!disabledInput)}
            />
          }
          type="number"
        />
      </Item>
      <Item label="Colonia" name="suburb" rules={DATA_GENERAL_SCHEMA.suburb}>
        <Input />
      </Item>
      <Item
        label="Ciudad"
        name="municipality"
        rules={DATA_GENERAL_SCHEMA.municipality}
      >
        <Input />
      </Item>
      <Item
        label="Código Postal"
        name="zipCode"
        rules={DATA_GENERAL_SCHEMA.zipCode}
      >
        <Input showCount maxLength={5} />
      </Item>
      <Button size="large" htmlType="submit" type="primary">
        Siguiente
      </Button>
      {loading && <Loading />}
    </Form>
  );
}

export default FormGeneralData;
