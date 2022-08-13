import { useQuery } from "@apollo/client";
import { Skeleton, Avatar, Typography, Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";

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
        <Col flex="150px">
          <Avatar size={128} icon={<UserOutlined />} />
        </Col>
        <Col flex="auto">
          <Row>
            <Title level={3}>
              {user?.name} {user?.firstLastName} {user?.secondLastName}
            </Title>
          </Row>
          <Row>
            <Title level={4} type="secondary">
              {specialty}
            </Title>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Profile;
