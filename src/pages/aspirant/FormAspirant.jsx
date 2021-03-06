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

const { Step } = Steps;

function FormAspirant({ data }) {
  let haveAddress =
    data?.usersPermissionsUser?.data?.attributes?.aspirant?.data?.attributes
      ?.address?.data;
  let haveSpecialtyOption =
    data?.usersPermissionsUser?.data?.attributes?.aspirant?.data?.attributes
      ?.specialtyOption?.data;
  let haveDocument =
    data?.usersPermissionsUser?.data?.attributes?.aspirant?.data?.attributes
      ?.document?.data;
  let idAspirant =
    data?.usersPermissionsUser?.data?.attributes?.aspirant?.data?.id;

  const [current, setCurrent] = useState(
    haveAddress ? (haveSpecialtyOption ? (haveDocument ? 3 : 2) : 1) : 0
  );

  const next = () => {
    setCurrent(current + 1);
  };

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
        <div>
          <Progress
            width={240}
            type="circle"
            percent={100}
            format={() => "Enviado"}
          />
          <Typography.Title level={2}>En espera de revisión</Typography.Title>
        </div>
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
