import { Card, Col, Row, Progress } from "antd";
import { RightCircleOutlined } from "@ant-design/icons";
import "../../styles/DashboardAspirant.modules.css";
import DashboardImage from "../../assets/img/dashboard-img.svg";
import { Link } from "react-router-dom";

function DashboardAspirant({ data }) {
  return (
    <div>
      <Row className="banner_container">
        <Col className="banner_card" flex="auto">
          <p>
            Hola{" "}
            <span>{data?.usersPermissionsUser?.data?.attributes?.name}</span>,
            bienvenido a la familia del CBTis 205
          </p>
          <p>
            Estamos felices de que estés aquí, queremos{" "}
            <span>crecer contigo</span>, acompañarte hacia tus metas y
            objetivos.
          </p>
        </Col>
        <Col className="banner_card" flex="auto">
          <div className="container-image">
            <img className="image" src={DashboardImage} alt="Dashboard" />
          </div>
        </Col>
      </Row>
      <Row className="cards_container">
        <Card
          className="card_progress"
          // headStyle={{ color: "#ffffff" }}
          title="Progreso de formularios"
          extra={
            <Link to="/dashboard">
              <RightCircleOutlined style={{ fontSize: "24px" }} />
            </Link>
          }
        >
          <Progress
            strokeWidth={12}
            width={240}
            type="circle"
            percent={100}
            format={() => "Enviado"}
          />
        </Card>
      </Row>
    </div>

    // <Card className="banner_container">
    //   <Grid className="banner_card" hoverable={false}>

    //   </Grid>
    //   <Grid className="banner_card" hoverable={false}>
    //     <img className="image" src={DashboardImage} alt="Dashboard" />
    //   </Grid>
    // </Card>
  );
}

export default DashboardAspirant;
