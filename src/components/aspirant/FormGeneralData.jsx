import { useState } from "react";
import { Button, Form, Input, Spin, Switch } from "antd";
import { DATA_GENERAL_SCHEMA } from "../../forms/schemas/aspirant.schema";
import { DATA_GENERAL_INITIAL_STATE } from "../../forms/states/aspirant";
import { addAddress } from "../../api/aspirant/addAddress";

const { Item } = Form;

function FormGeneralData({ next }) {
  const [loading, setLoading] = useState(false);
  const [disabledInput, setDisabledInput] = useState(false);

  const onFinish = async (data) => {
    let id = window.localStorage.getItem("id");
    console.log(
      "🚀 ~ file: FormGeneralData.jsx ~ line 11 ~ onSubmit ~ data",
      data
    );
    data = {
      ...data,
      number:
        disabledInput || data.number.length < 1 ? 0 : parseInt(data.number),
      aspirant: id
    };
    console.log(data);
    setLoading(true);
    const response = await addAddress(data);
    console.log(
      "🚀 ~ file: FormGeneralData.jsx ~ line 28 ~ onFinish ~ response",
      response
    );
    setLoading(false);
    // next();
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
      <Spin className="spin-layout" size="large" spinning={loading} />
    </Form>
  );
}

export default FormGeneralData;
