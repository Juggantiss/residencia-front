import { useState } from "react";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
// import ImgCrop from "antd-img-crop";
import { Button, Form, Spin, message, Upload } from "antd";

import { DOCUMENTATION_SCHEMA } from "../../forms/schemas/aspirant.schema";

const { Item } = Form;

const props = {
  name: "files",
  accept: ".pdf",
  multiple: false,
  maxCount: 1
  // action: process.env.REACT_APP_API_URL + "/upload",
  // headers: {
  //   Authorization: "Bearer " + window.localStorage.getItem("jwt")
  // },

  // progress: {
  //   strokeColor: {
  //     "0%": "#108ee9",
  //     "100%": "#87d068"
  //   },
  //   strokeWidth: 3,
  //   format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`
  // }
};

function FormDocumentation({ idAspirant }) {
  const [loadingForm, setLoadingForm] = useState(false);
  const [fileList, setFileList] = useState({
    certificate: null,
    birthCertificate: null,
    curp: null
  });

  const onRemove = (name) => setFileList({ ...fileList, [name]: null });

  const beforeUpload = (file, name) => {
    setFileList({ ...fileList, [name]: file });
    return false;
  };

  const onChangeCertificate = (info) => {
    console.log(
      "🚀 ~ file: FormDocumentation.jsx ~ line 53 ~ onChangeCertificate ~ info",
      info
    );
    const { status } = info.file;

    if (status === "done") {
      message.success(`${info.file.name} se ha subido correctamente.`, 2);
      // setStateUploads({ ...stateUploads, certificate: true });
    } else if (status === "error") {
      message.error(`${info.file.name} no se ha podido subir.`, 2);
      // setStateUploads({ ...stateUploads, certificate: false });
    }
  };

  const onFinish = async () => {
    console.log(fileList);
  };

  return (
    <Form
      name="form_register"
      className="register-form"
      onFinish={onFinish}
      scrollToFirstError
      layout="vertical"
      size="large"
    >
      <br />
      <h1>Constancia de estudios de secundaria</h1>
      <Item
        name="certificate"
        valuePropName="certificate"
        rules={DOCUMENTATION_SCHEMA.certificate}
      >
        <Upload
          name="certificate"
          {...props}
          onRemove={() => onRemove("certificate")}
          beforeUpload={(file) => beforeUpload(file, "certificate")}
        >
          <Button icon={<UploadOutlined />}>Selecciona tu archivo</Button>
        </Upload>
      </Item>
      <h1>Acta de Nacimiento</h1>
      <Item
        name="birthCertificate"
        valuePropName="birthCertificate"
        rules={DOCUMENTATION_SCHEMA.birthCertificate}
      >
        <Upload
          {...props}
          onRemove={() => onRemove("birthCertificate")}
          beforeUpload={(file) => beforeUpload(file, "birthCertificate")}
        >
          <Button icon={<UploadOutlined />}>Selecciona tu archivo</Button>
        </Upload>
      </Item>
      <h1>Curp</h1>
      <Item name="curp" valuePropName="curp" rules={DOCUMENTATION_SCHEMA.curp}>
        <Upload
          {...props}
          onRemove={() => onRemove("curp")}
          beforeUpload={(file) => beforeUpload(file, "curp")}
        >
          <Button icon={<UploadOutlined />}>Selecciona tu archivo</Button>
        </Upload>
      </Item>
      <Item
        name="photo"
        valuePropName="photo"
        rules={DOCUMENTATION_SCHEMA.photo}
      >
        <Upload
          {...props}
          onRemove={() => onRemove("photo")}
          beforeUpload={(file) => beforeUpload(file, "photo")}
        ></Upload>
      </Item>
      <Button size="large" htmlType="submit" type="primary">
        Enviar
      </Button>
      <Spin className="spin-layout" size="large" spinning={loadingForm} />
    </Form>
  );
}

const UploadItem = () => (
  <>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">
      Selecciona o arrastra tu archivo a esta área para subirlo
    </p>
    <p className="ant-upload-hint">
      Solo se admiten archivos .pdf, menores de 600kb
    </p>
  </>
);

export default FormDocumentation;
