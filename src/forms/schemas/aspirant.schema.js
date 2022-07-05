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
