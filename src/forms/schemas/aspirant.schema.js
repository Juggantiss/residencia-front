export const DATA_GENERAL_SCHEMA = {
  street: [
    { required: true, message: "Por favor ingresa el nombre de la calle" }
  ],
  number: [
    // {
    //   required: true,
    //   message: "Ingresa el número de la calle o selecciona S/N"
    // },
    { pattern: /^[0-9]+$/, message: "Solo debe tener números enteros" }
  ],
  suburb: [
    {
      required: true,
      message: "Por favor ingresa el nombre de la colonia o sección"
    }
  ],
  municipality: [
    {
      required: true,
      message: "Por favor ingresa el nombre de la ciudad"
    }
  ],
  zipCode: [
    {
      required: true,
      message: "Por favor ingresa el código postal"
    },
    { pattern: /^[0-9]+$/, message: "Solo debe tener números" }
  ]
};

export const SPECIALTY_SCHEMA = {
  specialty: [
    {
      required: true,
      message: "Debes seleccionar una especialidad"
    }
  ],
  schoolProcedence: [
    {
      required: true,
      message: "Debes ingresar el nombre de la escuela"
    },
    {
      pattern:
        /^[a-zA-ZÀ-ÿ0-9\u00f1\u00d1]([a-zA-ZÀ-ÿ0-9\u00f1\u00d1 ]*)[a-zA-ZÀ-ÿ0-9\u00f1\u00d1]$/,
      message: "El nombre solo debe incluir letras y números"
    }
  ]
};

export const DOCUMENTATION_SCHEMA = {
  certificate: [{ required: true, message: "Debes seleccionar tu constancia" }],
  birthCertificate: [
    { required: true, message: "Debes seleccionar tu acta de nacimiento" }
  ],
  curp: [{ required: true, message: "Debes seleccionar tu curp" }],
  pago: [{ required: true, message: "Debes subir tu comprobante de pago" }],
  photo: [{ required: true, message: "Debes seleccionar tu foto" }]
};
