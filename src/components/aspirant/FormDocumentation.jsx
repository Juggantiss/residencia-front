import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import { Button, Form, Upload, message } from "antd";

import { DOCUMENTATION_SCHEMA } from "../../forms/schemas/aspirant.schema";
import axios from "../../api/axiosSetup";
import { Error } from "../Alerts";
import { Loading } from "../Loading";

const { Item } = Form;

const props = {
  name: "files",
  accept: ".pdf",
  multiple: false,
  maxCount: 1
};

function FormDocumentation({ idAspirant, next }) {
  const [loadingForm, setLoadingForm] = useState(false);
  const [fileList, setFileList] = useState({
    certificate: null,
    birthCertificate: null,
    curp: null,
    pago: null,
    photo: null
  });

  const [fileImage, setFileImage] = useState([]);

  const onRemove = (name) => {
    if (name === "photo") {
      setFileImage([]);
    }
    setFileList({ ...fileList, [name]: null });
  };

  const beforeUpload = (file, name) => {
    console.log(file);
    if (name === "photo") {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let fileNew = new File([dataURLtoBlob(reader.result)], file.name, {
          uid: file.uid,
          type: file.type
        });
        fileNew.uid = file.uid;
        console.log(fileNew);
        setFileList({ ...fileList, photo: fileNew });
        setFileImage([{ url: reader.result, name: file.name }]);
      };
      return false;
    }
    setFileList({ ...fileList, [name]: file });
    console.log(fileList);
    return false;
  };

  const onPreview = async (file) => {
    let src = file.url;

    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);

        reader.onload = () => resolve(reader.result);
      });
    }

    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  const onFinish = async () => {
    console.log(fileList);
    if (fileList.photo !== null) {
      setLoadingForm(true);
      let formData = new FormData();
      formData.append("files", fileList.certificate);
      formData.append("files", fileList.birthCertificate);
      formData.append("files", fileList.curp);
      formData.append("files", fileList.pago);
      formData.append("files", fileList.photo);
      const response = await uploadFiles(formData);
      setLoadingForm(false);
      if (response?.data) {
        next();
        window.location.reload();
      }
      console.log("si ha pasado");
    } else {
      message.warning("No has ingresado la foto", 2);
    }
  };

  const uploadFiles = async (data) => {
    try {
      const response = await axios.post("/upload", data);
      const results = await response.data;
      console.log(response);
      let dataUploadAspirant = {
        aspirant: idAspirant,
        certificate: results[0].id,
        birthCertificate: results[1].id,
        curp: results[2].id,
        pago: results[3].id,
        photo: results[4].id
      };
      const responseAspirant = await axios.post("/documents", {
        data: dataUploadAspirant
      });
      console.log(responseAspirant);
      const responseUpdateAspirant = await axios.put(
        "/aspirants/" + idAspirant,
        {
          data: { statusRequest: "enviado" }
        }
      );
      console.log(responseUpdateAspirant);
      return responseUpdateAspirant;
    } catch (error) {
      Error("Ah ocurrido un error al subir los documentos", error?.message);
      return null;
    }
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
      <h1>Comprobante de pago</h1>
      <Item name="pago" valuePropName="pago" rules={DOCUMENTATION_SCHEMA.pago}>
        <Upload
          {...props}
          onRemove={() => onRemove("pago")}
          beforeUpload={(file) => beforeUpload(file, "pago")}
        >
          <Button icon={<UploadOutlined />}>Selecciona tu archivo</Button>
        </Upload>
      </Item>
      <h1>Foto tamaño infantil</h1>
      <Item name="photo">
        <ImgCrop
          rotate
          aspect={3 / 4}
          quality={0.2}
          modalCancel="Cancelar"
          modalOk="Aceptar"
          modalTitle="Recortar"
        >
          <Upload
            {...props}
            listType="picture"
            accept=".jpeg,.jpg"
            onPreview={onPreview}
            onRemove={() => onRemove("photo")}
            fileList={fileImage}
            beforeUpload={(file) => beforeUpload(file, "photo")}
          >
            <Button icon={<UploadOutlined />}>Selecciona tu foto</Button>
          </Upload>
        </ImgCrop>
      </Item>
      <Button size="large" htmlType="submit" type="primary">
        Enviar
      </Button>
      {loadingForm && <Loading />}
    </Form>
  );
}

export default FormDocumentation;
