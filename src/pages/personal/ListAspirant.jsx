import { useState } from "react";
import { Space, Table, Tag, Skeleton } from "antd";
import { GiCheckMark } from "react-icons/gi";
import { MdModeEdit } from "react-icons/md";
import { useQuery } from "@apollo/client/react";
import { GET_LIST_ASPIRANTS } from "../../graphql/queries";
import Profile from "../../components/aspirant/Profile";
import Modal from "../../components/Modal";
import { updateAspirant } from "../../api/personal/updateAspirant";
import { Warning, ModalInput, Error } from "../../components/Alerts";
import { Loading } from "../../components/Loading";
import FichaPdf from "../../components/aspirant/FichaPdf";
import { pdf } from "@react-pdf/renderer";
import axios from "../../api/axiosSetup";

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
  const { data, loading, error, refetch } = useQuery(GET_LIST_ASPIRANTS);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataAspirant, setDataAspirant] = useState(null);
  const [idUser, setIdUser] = useState(null);
  const [loadingAction, setLoadingAction] = useState(false);
  const [status, setStatus] = useState(null);

  if (error) {
    return Error("Ah ocurrido un error al traer los datos", error?.message);
  }

  let newData = [];
  let generals = {};

  if (data) {
    generals = data?.generals?.data[0];
    data?.aspirants?.data?.map((aspirant) => {
      const user = aspirant?.attributes?.user?.data?.attributes;
      const idUser = aspirant?.attributes?.user?.data?.id;
      if (user) {
        const specialty =
          aspirant?.attributes?.specialtyOption?.data?.attributes?.specialty
            ?.data?.attributes;

        newData = [
          ...newData,
          {
            key: aspirant?.id,
            id: idUser,
            name: user
              ? `${user.name} ${user.firstLastName} ${user.secondLastName}`.toUpperCase()
              : "",
            birthday: user ? user.birthday : "",
            gender: user ? user.gender : "",
            status: aspirant?.attributes?.status,
            specialty: specialty?.description,
            document: aspirant?.attributes?.document?.data?.id,
            photo:
              aspirant?.attributes?.document?.data?.attributes?.photo?.data
                ?.attributes?.url
          }
        ];
      }
      return null;
    });
  }

  const columns = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Especialidad",
      dataIndex: "specialty",
      key: "specialty",
      responsive: ["md"]
    },
    {
      title: "Estado",
      key: "status",
      dataIndex: "status",
      render: (_, { key, status }) => {
        let color = colorByStatus(status);

        return (
          <Tag style={{ borderRadius: 10 }} color={color} key={key}>
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
    }
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_, record) => {
    //     const { status } = record;
    //     if (status === "enviado") {
    //       return (
    //         <Space size="small">
    //           <div className="tooltip" data-tip="Observaciones">
    //             <MdModeEdit
    //               size={24}
    //               color="#8898aa"
    //               cursor="pointer"
    //               onClick={() => handleClickMessage(record.key)}
    //             />
    //           </div>
    //           <div className="tooltip tooltip-success" data-tip="Aceptar">
    //             <GiCheckMark
    //               size={24}
    //               color="#16bd3f"
    //               onClick={() => {
    //                 let aspirantFicha = {
    //                   name: record.name,
    //                   speciality: record.specialty,
    //                   photo: record.photo
    //                 };
    //                 handleClickAccept(
    //                   record.key,
    //                   record.document,
    //                   aspirantFicha
    //                 );
    //               }}
    //               cursor="pointer"
    //             />
    //           </div>
    //         </Space>
    //       );
    //     }
    //   }
    // }
  ];

  const showModal = (id) => {
    setIdUser(id);
    setIsModalVisible(true);
  };

  const handleClose = () => {
    setIsModalVisible(false);
  };

  const handleClickAccept = async (idAspirant, idDoc, aspirantFicha) => {
    Warning(
      "¿Estás seguro de que los datos son correctos?",
      "Estas confirmando que los datos del aspirante son correctos y quedará aprobado.",
      "Confirmar",
      () => sendPdf(idAspirant, idDoc, aspirantFicha)
    );
  };

  const handleClickDecline = async (id) => {
    Warning(
      "¿Estás seguro de querer rechazar al aspirante?",
      "Se le reiniciará todo el registro.",
      "Confirmar",
      async () =>
        await actionUpdateAspirant(
          {
            statusRequest: "registrado",
            specialtyOption: null,
            document: null,
            address: null,
            schoolProcedence: ""
          },
          id
        )
    );
  };

  const handleClickMessage = async (id) => {
    const text = await ModalInput("Observación");
    if (text) {
      console.log(text);
      await actionUpdateAspirant({ observations: text }, id);
    }
  };

  const actionUpdateAspirant = async (data, id) => {
    setIsModalVisible(false);
    setLoadingAction(true);
    const response = await updateAspirant(data, id);
    // console.log(response);
    resultForResponse(response);
    setLoadingAction(false);
  };

  const sendPdf = async (idAspirant, idDoc, aspirantFicha) => {
    try {
      setIsModalVisible(false);
      setLoadingAction(true);
      const blob = await pdf(
        <FichaPdf data={aspirantFicha} generales={generals?.attributes} />
      ).toBlob({
        quality: 0.5
      });
      const formData = new FormData();
      formData.append("files", blob);
      const response = await uploadFiles(formData, idAspirant, idDoc);
      resultForResponse(response);
      setLoadingAction(false);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadFiles = async (data, idAspirant, idDoc) => {
    try {
      const response = await axios.post("/upload", data);
      if (response?.data) {
        console.log(response.data);
        const responseGenerals = await axios.put("/generals/" + generals?.id, {
          data: {
            numeroFicha: generals?.attributes?.numeroFicha + 1
          }
        });
        console.log(responseGenerals);
        const responseDocument = await axios.put("/documents/" + idDoc, {
          data: { ficha: response.data[0].id }
        });
        console.log(responseDocument);
        const responseUpdateAspirant = await axios.put(
          "/aspirants/" + idAspirant,
          {
            data: { statusRequest: "aprobado" }
          }
        );
        console.log(responseUpdateAspirant);
        return responseUpdateAspirant;
      }
      return null;
    } catch (error) {
      Error("Ah ocurrido un error al generar la ficha", error?.message);
      return null;
    }
  };

  const resultForResponse = (response) => {
    if (response?.data) {
      refetch();
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold">Lista de solicitud de aspirantes</h1>

      {loading ? (
        <Skeleton active paragraph={{ rows: 5 }} />
      ) : (
        <Table
          onRow={(row) => ({
            onDoubleClick: () => {
              const { status } = row;
              setStatus(status);
              let aspirantFicha = {
                name: row?.name,
                speciality: row?.specialty,
                photo: row?.photo
              };
              setDataAspirant({
                id: row?.key,
                idDoc: row?.document,
                ficha: aspirantFicha
              });
              showModal(row?.id);
            }
          })}
          columns={columns}
          dataSource={newData}
          pagination={{
            position: ["topRight"]
          }}
        />
      )}

      {loadingAction && <Loading />}

      {isModalVisible && (
        <Modal
          close={handleClose}
          accept={() =>
            handleClickAccept(
              dataAspirant?.id,
              dataAspirant?.idDoc,
              dataAspirant?.ficha
            )
          }
          decline={() => handleClickDecline(dataAspirant?.id)}
          message={() => handleClickMessage(dataAspirant?.id)}
          haveActions={status === "enviado"}
        >
          <Profile id={idUser} />
        </Modal>
      )}
    </>
  );
}

export default ListAspirant;
