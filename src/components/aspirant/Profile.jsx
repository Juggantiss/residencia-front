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

  let baseUrl = process.env.REACT_APP_API_URL.slice(0, -4);

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
      <Row>
        <Col
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
          span={24}
        >
          <div className="avatar">
            <div className="w-32 mask mask-squircle">
              <img src="https://placeimg.com/192/192/people" />
            </div>
          </div>
          {/* <Avatar
            size={{
              xs: 24,
              sm: 32,
              md: 40,
              lg: 64,
              xl: 80,
              xxl: 128
            }}
            icon={<UserOutlined />}
          /> */}
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
          <Row gutter={12}>
            <Col>
              <div
                className={`badge ${
                  user?.gender === "Hombre"
                    ? "badge-primary"
                    : user?.gender === "Mujer" && "badge-secondary"
                }  badge-lg`}
              >
                {user?.gender}
              </div>
            </Col>
            <Col>
              <div className="badge badge-lg">{specialty}</div>
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
      <Row style={{ padding: "15px 0 15px  0" }}>
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
        <Col
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
          span={8}
        >
          <Link
            to={{
              pathname: baseUrl + document?.certificate?.data?.attributes?.url
            }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="btn gap-2">
              <FilePdfOutlined />
              Certificado
            </button>
          </Link>
        </Col>
        <Col
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
          span={8}
        >
          <Link
            to={{
              pathname: baseUrl + document?.curp?.data?.attributes?.url
            }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="btn gap-2">
              <FilePdfOutlined />
              CURP
            </button>
          </Link>
        </Col>
        <Col
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
          span={8}
        >
          <Link
            to={{
              pathname:
                baseUrl + document?.birthCertificate?.data?.attributes?.url
            }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="btn gap-2">
              <FilePdfOutlined />
              Acta
            </button>
          </Link>
          {/* <Link
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
          </Link> */}
        </Col>
      </Row>
    </>
  );
};

export default Profile;