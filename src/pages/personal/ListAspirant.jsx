import { Space, Table, Tag } from "antd";
import { CheckOutlined, EditOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/client/react";
import { GET_LIST_ASPIRANTS } from "../../graphql/queries";

const columns = [
  {
    title: "Nombre",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "Especialidad",
    dataIndex: "specialty",
    key: "specialty"
  },
  {
    title: "Estado",
    key: "status",
    dataIndex: "status",
    render: (_, { key, status }) => {
      let color =
        status === "registrado"
          ? "geekblue"
          : status === "enviado"
          ? "green"
          : "volcano";

      return (
        <Tag color={color} key={key}>
          {status.toUpperCase()}
        </Tag>
      );
    }
  },
  {
    title: "Nacimiento",
    dataIndex: "birthday",
    key: "birthday",
    responsive: ["md"]
  },
  {
    title: "Sexo",
    dataIndex: "gender",
    key: "gender",
    responsive: ["md"]
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="small">
        <EditOutlined
          onClick={() => console.log("Se va a editar", record)}
          style={{ fontSize: "24px" }}
        />
        <CheckOutlined
          onClick={() => console.log("Aceptado!", record)}
          style={{ fontSize: "24px" }}
        />
      </Space>
    )
  }
];

function ListAspirant() {
  const { data, loading, error } = useQuery(GET_LIST_ASPIRANTS);

  if (loading) {
    return <h1>Cargando...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  let newData = [];

  if (data) {
    data?.aspirants?.data?.map((aspirant) => {
      const user = aspirant?.attributes?.user?.data?.attributes;
      const specialty =
        aspirant?.attributes?.specialtyOption?.data?.attributes?.specialty?.data
          ?.attributes;

      newData = [
        ...newData,
        {
          key: aspirant?.id,
          name: user
            ? `${user.name} ${user.firstLastName} ${user.secondLastName}`
            : "",
          birthday: user ? user.birthday : "",
          gender: user ? user.gender : "",
          status: aspirant?.attributes?.status,
          specialty: specialty?.description
        }
      ];
      return null;
    });
  }

  return (
    <>
      <h1>Lista de solicitud de aspirantes</h1>
      <Table
        // rowSelection={{ type: "checkbox" }}
        columns={columns}
        dataSource={newData}
      />
    </>
  );
}

export default ListAspirant;
