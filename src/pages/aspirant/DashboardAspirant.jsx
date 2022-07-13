import { Card, Typography } from "antd";
import "../../styles/DashboardAspirant.modules.css";
import DashboardImage from "../../assets/img/dashboard-img.svg";

const { Grid } = Card;
const { Text } = Typography;

function DashboardAspirant({ data }) {
  return (
    <Card className="banner_container">
      <Grid className="banner_card" hoverable={false}>
        <p>
          Hola <span>{data?.usersPermissionsUser?.data?.attributes?.name}</span>
          , bienvenido a la familia del CBTis 205
        </p>
        <p>
          Estamos felices de que estés aquí, queremos{" "}
          <span>crecer contigo</span>, acompañarte hacia tus metas y objetivos.
        </p>
      </Grid>
      <Grid className="banner_card" hoverable={false}>
        <img className="image" src={DashboardImage} alt="Dashboard Image" />
      </Grid>
    </Card>
  );
}

export default DashboardAspirant;
