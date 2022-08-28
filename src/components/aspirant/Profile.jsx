import { useQuery } from "@apollo/client";
import { Skeleton, Typography, Row, Col } from "antd";
import { FilePdfOutlined } from "@ant-design/icons";

import { GET_ASPIRANT_DATA } from "../../graphql/queries";

const { Title } = Typography;

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
  let url = document?.photo?.data?.attributes?.url;

  let profilePhoto = url ? url : "https://placeimg.com/192/192/people";

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
              <img src={profilePhoto} alt="profile" />
            </div>
          </div>
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
      {document && (
        <Row>
          {document?.certificate && (
            <Col
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
              span={8}
            >
              <a
                href={document?.certificate?.data?.attributes?.url}
                target="_blank"
                rel="noreferrer"
              >
                <button className="btn gap-2">
                  <FilePdfOutlined />
                  Certificado
                </button>
              </a>
            </Col>
          )}
          {document?.curp && (
            <Col
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
              span={8}
            >
              <a
                href={document?.curp?.data?.attributes?.url}
                target="_blank"
                rel="noreferrer"
              >
                <button className="btn gap-2">
                  <FilePdfOutlined />
                  CURP
                </button>
              </a>
            </Col>
          )}
          {document?.birthCertificate && (
            <Col
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
              span={8}
            >
              <a
                href={document?.birthCertificate?.data?.attributes?.url}
                target="_blank"
                rel="noreferrer"
              >
                <button className="btn gap-2">
                  <FilePdfOutlined />
                  Acta
                </button>
              </a>
            </Col>
          )}
        </Row>
      )}
    </>
  );
};

export default Profile;
