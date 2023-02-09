import getProgressFormAspirant from "../../utils/getProgressFormAspirant";

const StatsAspirant = ({ status, data, observaciones }) => {
  const textByStatus = () => {
    switch (status) {
      case "registrado":
        return "Puedes continuar con los formularios";
      case "generales":
        return "Escoge tu especialidad";
      case "documentos":
        return "Ya casi acabas, solo debes subir tus documentos";
      case "enviado":
        return "En espera de revisión";
      case "observaciones":
        return observaciones;
      case "aprobado":
        return "Descargar la ficha generada y llevar a la escuela para el sello oficial";
      case "rechazado":
        return "Lo sentimos has sido rechazado";
      default:
        return "";
    }
  };

  let text = textByStatus();
  let percent = getProgressFormAspirant(data);
  let remaind =
    percent[0] === 3 ? 0 : percent[0] === 2 ? 1 : percent[0] === 1 ? 2 : 3;

  return (
    <div className="stats stats-vertical lg:stats-horizontal shadow mb-5">
      <div className="stat place-items-center">
        <div className="stat-figure text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-8 h-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
        {observaciones ? (
          <div className="stat-title text-error-content">{observaciones}</div>
        ) : (
          <div className="stat-title">Estado</div>
        )}
        <div className="stat-value text-primary">
          {status?.slice(0, 1).toUpperCase() + status?.slice(1)}
        </div>
        <div className="stat-desc">{text}</div>
      </div>

      <div className="stat place-items-center">
        <div className="stat-figure text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-8 h-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            ></path>
          </svg>
        </div>
        <div className="stat-value">{percent[1]}%</div>
        <div className="stat-title">Formularios completados</div>
        <div className="stat-desc text-primary">Faltan {remaind}</div>
      </div>
    </div>
  );
};

export default StatsAspirant;
