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

const data01 = [
  { name: "Sistemas", value: 4 },
  { name: "Enfermeria", value: 3 },
  { name: "Construccion", value: 3 },
  { name: "Administracion", value: 2 },
  { name: "Informatica", value: 2 },
  { name: "Contabilidad", value: 1 }
];

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#e74b87",
  "#9b9aed",
  "#19232e"
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
        documentacion:
          data?.aspirantsDocumentacion?.meta?.pagination?.total || 0,
        observaciones:
          data?.aspirantsObservaciones?.meta?.pagination?.total || 0,
        aprobado: data?.aspirantsAprobado?.meta?.pagination?.total || 0,
        rechazado: data?.aspirantsRechazado?.meta?.pagination?.total || 0
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
              data={data01}
              cx="50%"
              cy="50%"
              outerRadius={90}
              label
            >
              {data01.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
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
            <Bar dataKey="documentacion" fill="#FF8042" />
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
