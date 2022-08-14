import { useQuery } from "@apollo/client";
import { Skeleton, Avatar, Typography, Row, Col } from "antd";
import { UserOutlined, FilePdfOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import { GET_ASPIRANT_DATA } from "../../graphql/queries";

const { Title, Text } = Typography;

const Profile = ({ id }) => {
  const { data, loading, error } = useQuery(GET_ASPIRANT_DATA, {
    variables: { ID: id }
  });

  if (error) {
    return <h1>{error.message}</h1>;
  }

  let user = data?.usersPermissionsUser?.data?.attributes;
  let aspirant = user?.aspirant?.data?.attributes;
  let specialty =
    aspirant?.specialtyOption?.data?.attributes?.specialty?.data?.attributes
      ?.description;
  let address = aspirant?.address?.data?.attributes;
  let document = aspirant?.document?.data?.attributes;

  return loading ? (
    <Skeleton
      active
      avatar
      paragraph={{
        rows: 4
      }}
    />
  ) : (
    <>
      <Row align="middle">
        <Col flex="150px">
          <Avatar
            size={{
              xs: 24,
              sm: 32,
              md: 40,
              lg: 64,
              xl: 80,
              xxl: 128
            }}
            icon={<UserOutlined />}
          />
        </Col>
        <Col flex="auto">
          <Row>
            <Title level={4}>
              {user?.name} {user?.firstLastName} {user?.secondLastName}
            </Title>
          </Row>
          <Row>
            <Title level={5}>{user?.curp}</Title>
          </Row>
          <Row>
            <Title level={5} type="secondary">
              {user?.email}
            </Title>
          </Row>
          <Row>
            <Col>
              <Title level={5} keyboard>
                {user?.gender}
              </Title>
            </Col>
            <Col>
              <Title level={5} keyboard>
                {specialty}
              </Title>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "20px 0 0",
            alignItems: "center"
          }}
          span={8}
        >
          <Title level={5}>Teléfono:</Title>
          <Title level={5} type="secondary">
            {user?.phone}
          </Title>
        </Col>
        <Col
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "20px 0 0",
            alignItems: "center"
          }}
          span={8}
        >
          <Title level={5}>Fecha de nacimiento:</Title>
          <Title level={5} type="secondary">
            {user?.birthday}
          </Title>
        </Col>
        <Col
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "20px 0 0",
            alignItems: "center",
            textAlign: "center"
          }}
          span={8}
        >
          <Title level={5}>Escuela:</Title>
          <Title level={5} type="secondary">
            {aspirant?.schoolProcedence}
          </Title>
        </Col>
      </Row>
      <Row>
        <Col
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "20px 0 0",
            alignItems: "center"
          }}
          span={24}
        >
          <Title level={5}>Domicilio:</Title>
          <Title level={5} type="secondary">
            {address?.street} {address?.number}, {address?.suburb},{" "}
            {address?.municipality}, {address?.zipCode}
          </Title>
        </Col>
      </Row>
      <Row style={{ padding: "20px 0 15px  0" }}>
        <Col
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
          span={24}
        >
          <Title level={5}>Documentos:</Title>
        </Col>
      </Row>
      <Row>
        <Col style={{ padding: "10px 0 0" }} span={8}>
          <Link
            style={{
              padding: 10,
              border: "1px solid #CCCCCC",
              borderRadius: 8,
              fontSize: 16,
              backgroundColor: "#f1f1f1",
              cursor: "pointer"
            }}
            to={{
              pathname:
                process.env.REACT_APP_API_URL.slice(0, -4) +
                document?.certificate?.data?.attributes?.url
            }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FilePdfOutlined /> <Text>Certificado</Text>
          </Link>
        </Col>
        <Col style={{ padding: "10px 0 0" }} span={6}>
          <Link
            style={{
              padding: 10,
              border: "1px solid #CCCCCC",
              borderRadius: 8,
              fontSize: 16,
              backgroundColor: "#f1f1f1",
              cursor: "pointer"
            }}
            to={{
              pathname:
                process.env.REACT_APP_API_URL.slice(0, -4) +
                document?.curp?.data?.attributes?.url
            }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FilePdfOutlined /> <Text>CURP</Text>
          </Link>
        </Col>
        <Col style={{ padding: "10px 0 0" }} span={10}>
          <Link
            style={{
              padding: 10,
              border: "1px solid #CCCCCC",
              borderRadius: 8,
              fontSize: 16,
              backgroundColor: "#f1f1f1",
              cursor: "pointer"
            }}
            to={{
              pathname:
                process.env.REACT_APP_API_URL.slice(0, -4) +
                document?.birthCertificate?.data?.attributes?.url
            }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FilePdfOutlined /> <Text>Acta de nacimiento</Text>
          </Link>
        </Col>
      </Row>
    </>
  );
};

export default Profile;
