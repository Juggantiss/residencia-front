export const LOGIN_SCHEMA = {
  email: [
    {
      required: true,
      message: "Por favor ingresa tu correo!"
    }
  ],
  password: [
    {
      required: true,
      message: "Por favor ingresa tu contraseña"
    }
  ]
};
