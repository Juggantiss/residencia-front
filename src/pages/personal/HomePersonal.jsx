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

const data01 = [
  { name: "Sistemas", value: 4 },
  { name: "Enfermeria", value: 3 },
  { name: "Construccion", value: 3 },
  { name: "Administracion", value: 2 },
  { name: "Informatica", value: 2 },
  { name: "Contabilidad", value: 1 }
];

const data02 = [
  { name: "Hombres", value: 2 },
  { name: "Mujeres", value: 3 }
];

const data = [
  {
    name: "Status",
    registrado: 40,
    enviado: 24,
    formularios: 20,
    generales: 15,
    documentacion: 30,
    observaciones: 35,
    aprobado: 45,
    rechazado: 10
  }
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
  return (
    <>
      <StatsPersonal />
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
              data={data02}
              cx="50%"
              cy="50%"
              outerRadius={90}
              innerRadius={60}
              paddingAngle={5}
              label
            >
              {data02.map((entry, index) => (
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
          <BarChart width={500} height={300} data={data}>
            {/* {data.map((entry, index) => (
              <Bar
                key={`bar-${index}`}
                dataKey="uv"
                fill={COLORS[index % COLORS.length]}
              />
            ))} */}
            {/* <Legend />
            <Bar dataKey="registrado" fill="#19232e" />
            <Bar dataKey="formularios" fill="#8884d8" />
            <Bar dataKey="generales" fill="#e74b87" />
            <Bar dataKey="documentacion" fill="#FF8042" />
            <Bar dataKey="enviado" fill="#0088FE" />
            <Bar dataKey="observaciones" fill="#FFBB28" />
            <Bar dataKey="aprobado" fill="#00C49F" />
            <Bar dataKey="rechazado" fill="#cf4051" /> */}
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
