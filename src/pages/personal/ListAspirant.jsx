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
      let color = colorByStatus(status);

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
    responsive: ["md"],
    render: (_, { gender }) =>
      gender === "Hombre" ? "M" : gender === "Mujer" ? "F" : ""
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="small">
        <EditOutlined
          onClick={() => console.log("Se va a editar", record)}
          style={{ fontSize: "24px", color: "#8898aa" }}
        />
        <CheckOutlined
          onClick={() => console.log("Aceptado!", record)}
          style={{ fontSize: "24px", color: "#16bd3f" }}
        />
      </Space>
    )
  }
];

const colorByStatus = (status) => {
  switch (status) {
    case "registrado":
      return "#8898aa";
    case "generales":
      return "#725b10";
    case "documentos":
      return "#725b10";
    case "enviado":
      return "#01b6a4";
    case "observaciones":
      return "#5b08e2";
    case "aprobado":
      return "#16bd3f";
    case "rechazado":
      return "#fd4a4a";
    default:
      return "#8898aa";
  }
};

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
      if (user) {
        const specialty =
          aspirant?.attributes?.specialtyOption?.data?.attributes?.specialty
            ?.data?.attributes;

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
      }
      return null;
    });
  }

  return (
    <>
      <h1>Lista de solicitud de aspirantes</h1>
      <Table
        // rowSelection={{ type: "checkbox" }}
        onRow={(row) => ({
          onClick: () => console.log(row)
        })}
        columns={columns}
        dataSource={newData}
      />
    </>
  );
}

export default ListAspirant;
