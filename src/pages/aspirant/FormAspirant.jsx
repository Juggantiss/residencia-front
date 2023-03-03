import { useState } from "react";
import {
  SolutionOutlined,
  SelectOutlined,
  FileAddOutlined,
  CheckSquareOutlined
} from "@ant-design/icons";
import { Steps, Progress, Typography } from "antd";

import "../../styles/FormAspirant.modules.css";
import FormGeneralData from "../../components/aspirant/FormGeneralData";
import FormSpecialty from "../../components/aspirant/FormSpecialty";
import FormDocumentation from "../../components/aspirant/FormDocumentation";
import getProgressFormAspirant from "../../utils/getProgressFormAspirant";
import { Info } from "../../components/Alerts";

const { Step } = Steps;

function FormAspirant({ data }) {
  let percent = getProgressFormAspirant(data);
  let idAspirant =
    data?.usersPermissionsUser?.data?.attributes?.aspirant?.data?.id;

  const [current, setCurrent] = useState(percent[0]);
  const next = () => {
    setCurrent(current + 1);
  };

  let status =
    data?.usersPermissionsUser?.data?.attributes?.aspirant?.data?.attributes
      ?.statusRequest;

  if (status === "enviado") {
    Info(
      "SEPTIMO PASO",
      "Una vez enviada toda la información, esta será validada y en un periodo 48 horas vuelva a iniciar sesión para verificar si su solicitud fue aprobada y su ficha fue generada o en  caso que tenga observaciones iniciar otra vez su solicitud tomando las observaciones en cuenta.",
      () => {}
    );
  }

  // const prev = () => {
  //   setCurrent(current - 1);
  // };

  const steps = [
    {
      title: "Generales",
      content: <FormGeneralData next={next} idAspirant={idAspirant} />,
      icon: <SolutionOutlined />
    },
    {
      title: "Especialidad",
      content: <FormSpecialty next={next} idAspirant={idAspirant} />,
      icon: <SelectOutlined />
    },
    {
      title: "Documentos",
      content: <FormDocumentation idAspirant={idAspirant} next={next} />,
      icon: <FileAddOutlined />
    },
    {
      title: "Finalizado",
      content: (
        <>
          <Typography.Title level={2}>Enviado</Typography.Title>
          <Progress
            strokeWidth={12}
            width={240}
            type="dashboard"
            percent={100}
          />
          <Typography.Title level={2}>
            En espera de revisión máximo 48 horas
          </Typography.Title>
        </>
      ),
      icon: <CheckSquareOutlined />
    }
  ];

  return (
    <div className="container">
      <Steps current={current}>
        {steps.map((item) => (
          <Step
            key={item.title}
            title={item.title}
            icon={item.icon}
            status={item.status}
          />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
      <div className="steps-action"></div>
    </div>
  );
}

export default FormAspirant;
