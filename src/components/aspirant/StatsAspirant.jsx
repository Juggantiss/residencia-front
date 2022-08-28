const StatsAspirant = () => {
  return (
    <div className="stats shadow mb-5">
      <div className="stat">
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
        <div className="stat-title">Estado</div>
        <div className="stat-value text-primary">Enviado</div>
        <div className="stat-desc">En espera de revisión</div>
      </div>

      <div className="stat">
        <div className="stat-figure text-secondary">
          <div className="avatar online">
            <div className="w-16 rounded-full">
              <img src="https://placeimg.com/128/128/people" />
            </div>
          </div>
        </div>
        <div className="stat-value">20%</div>
        <div className="stat-title">Formularios completados</div>
        <div className="stat-desc text-secondary">Faltan 2</div>
      </div>
    </div>
  );
};

export default StatsAspirant;
