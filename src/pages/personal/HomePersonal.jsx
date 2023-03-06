import StatsPersonal from "../../components/personal/StatsPersonal";
import {
  PieChart,
  BarChart,
  Bar,
  Pie,
  Cell,
  Tooltip,
  Legend,
  CartesianGrid,
  XAxis,
  YAxis
} from "recharts";
import { useQuery } from "@apollo/client";
import { GET_STATS_ASPIRANTS } from "../../graphql/queries";
import { Loading } from "../../components/Loading";
import { Error } from "../../components/Alerts";

const COLORS = [
  "#FF8042",
  "#19232e",
  "#0088FE",
  "#e74b87",
  "#00C49F",
  "#9b9aed",
  "#FFBB28"
];
const COLORS_GENDER = ["#0088FE", "#e74b87"];

const HomePersonal = () => {
  const { loading, data, error } = useQuery(GET_STATS_ASPIRANTS);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return Error("Ah ocurrido un error al traer los datos", error?.message);
  }

  let dataGender = [];
  let dataStatus = [];
  let dataSpecialty = [];

  if (data) {
    dataGender = [
      {
        name: "Hombres",
        value: data?.aspirantsHombres?.meta?.pagination?.total || 0
      },
      {
        name: "Mujeres",
        value: data?.aspirantsMujeres?.meta?.pagination?.total || 0
      }
    ];
    dataStatus = [
      {
        name: "Status",
        registrado: data?.aspirantsRegistrado?.meta?.pagination?.total || 0,
        enviado: data?.aspirantsEnviado?.meta?.pagination?.total || 0,
        formularios: data?.aspirantsFormularios?.meta?.pagination?.total || 0,
        generales: data?.aspirantsGenerales?.meta?.pagination?.total || 0,
        documentos: data?.aspirantsDocumentos?.meta?.pagination?.total || 0,
        observaciones:
          data?.aspirantsObservaciones?.meta?.pagination?.total || 0,
        aprobado: data?.aspirantsAprobado?.meta?.pagination?.total || 0,
        rechazado: data?.aspirantsRechazado?.meta?.pagination?.total || 0
      }
    ];
    dataSpecialty = [
      {
        name: "Administración de RR HH",
        value: data?.aspirantsAdministracion?.meta?.pagination?.total || 0
      },
      {
        name: "Construccion",
        value: data?.aspirantsConstruccion?.meta?.pagination?.total || 0
      },
      {
        name: "Ofimática",
        value: data?.aspirantsOfimatica?.meta?.pagination?.total || 0
      },
      {
        name: "Enfermería General",
        value: data?.aspirantsEnfermeria?.meta?.pagination?.total || 0
      },
      {
        name: "Programación",
        value: data?.aspirantsProgramacion?.meta?.pagination?.total || 0
      }
    ];
  }

  return (
    <>
      <StatsPersonal data={data} />
      <div className="stats shadow mb-5">
        <div className="stat place-items-center">
          <div className="stat-title">Aspirantes por especialidad</div>
          <PieChart width={300} height={300}>
            <Pie
              dataKey="value"
              isAnimationActive={true}
              data={dataSpecialty}
              cx="50%"
              cy="50%"
              outerRadius={90}
              label
            >
              {dataSpecialty.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </div>
        <div className="stat place-items-center">
          <div className="stat-title">Aspirantes por género</div>
          <PieChart width={300} height={300}>
            <Pie
              dataKey="value"
              isAnimationActive={true}
              data={dataGender}
              cx="50%"
              cy="50%"
              outerRadius={90}
              innerRadius={60}
              paddingAngle={5}
              label
            >
              {dataGender.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS_GENDER[index % COLORS_GENDER.length]}
                />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </div>
      </div>
      <div className="stats shadow">
        <div className="stat place-items-center">
          <div className="stat-title">Aspirantes por status</div>
          <BarChart width={500} height={300} data={dataStatus}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="registrado" fill="#19232e" />
            <Bar dataKey="formularios" fill="#8884d8" />
            <Bar dataKey="generales" fill="#e74b87" />
            <Bar dataKey="documentos" fill="#FF8042" />
            <Bar dataKey="enviado" fill="#0088FE" />
            <Bar dataKey="observaciones" fill="#FFBB28" />
            <Bar dataKey="aprobado" fill="#00C49F" />
            <Bar dataKey="rechazado" fill="#cf4051" />
          </BarChart>
        </div>
      </div>
    </>
  );
};

export default HomePersonal;
