import { useState } from "react";
import {
  HomeOutlined,
  SolutionOutlined,
  SelectOutlined,
  FileAddOutlined
} from "@ant-design/icons";
import { Button, message, Steps } from "antd";
import Aspirant from "../../layouts/Aspirant";

import "../../styles/FormAspirant.modules.css";
import FormGeneralData from "../../components/aspirant/FormGeneralData";

const { Step } = Steps;

const path = [
  {
    name: <HomeOutlined />,
    route: "/dashboard"
  },
  {
    name: "Formularios"
  }
];

function FormAspirant() {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: "Generales",
      content: <FormGeneralData next={next} />,
      icon: <SolutionOutlined />
    },
    {
      title: "Especialidad",
      content: "Second-content",
      icon: <SelectOutlined />
    },
    {
      title: "Documentos",
      content: "Last-content",
      icon: <FileAddOutlined />
    }
  ];

  return (
    <Aspirant path={path}>
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
        <div className="steps-action">
          {current < steps.length - 1 && (
            <Button size="large" type="primary" onClick={() => next()}>
              Siguiente
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              size="large"
              type="primary"
              onClick={() => message.success("Processing complete!")}
            >
              Enviar
            </Button>
          )}
          {current > 0 && (
            <Button
              size="large"
              style={{
                margin: "0 8px"
              }}
              onClick={() => prev()}
            >
              Anterior
            </Button>
          )}
        </div>
      </div>
    </Aspirant>
  );
}

export default FormAspirant;
