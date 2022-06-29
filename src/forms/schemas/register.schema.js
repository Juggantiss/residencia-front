export const REGISTER_SCHEMA = {
  curp: [
    {
      required: true,
      message: "Por favor ingresa tu curp"
    },
    {
      pattern: /^[a-zA-Z0-9|ñ|Ñ]+$/,
      message: "La curp solo debe incluir letras y números sin espacios"
    }
  ],
  name: [
    {
      required: true,
      message: "Por favor ingresa un nombre"
    },
    {
      pattern: /^[a-zA-Z|ñ|Ñ]([a-zA-Z|ñ|Ñ ]*)[a-zA-Z|ñ|Ñ]$/,
      message: "El nombre solo debe incluir letras"
    }
  ],
  firstLastName: [
    {
      required: true,
      message: "Por favor ingresa tu apellido paterno"
    },
    {
      pattern: /^[a-zA-Z|ñ|Ñ]([a-zA-Z|ñ|Ñ ]*)[a-zA-Z|ñ|Ñ]$/,
      message: "El apellido paterno solo debe incluir letras"
    }
  ],
  secondLastName: [
    {
      required: true,
      message: "Por favor ingresa tu apellido materno"
    },
    {
      pattern: /^[a-zA-Z|ñ|Ñ]([a-zA-Z|ñ|Ñ ]*)[a-zA-Z|ñ|Ñ]$/,
      message: "El apellido materno solo debe incluir letras"
    }
  ],
  email: [
    {
      required: true,
      message: "Por favor ingresa tu correo"
    },
    {
      pattern:
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
      message: "Ingresa un correo válido"
    }
  ],
  password: [
    {
      required: true,
      message: "Por favor ingresa una contraseña"
    }
  ],
  confirmPassword: [
    {
      required: true,
      message: "Por favor confirma tu contraseña"
    }
  ],
  birthday: [
    {
      required: true,
      message: "Por favor ingresa tu año de nacimiento"
    }
  ],
  phone: [
    {
      required: true,
      message: "Por favor ingresa tu número de teléfono"
    },
    {
      pattern: /^[0-9]+$/,
      message: "El número de teléfono solo debe incluir números"
    }
  ],
  gender: [
    {
      required: true,
      message: "Por favor ingresa tu sexo"
    }
  ],
  polities: [
    {
      required: true,
      message: "Debes de aceptar las políticas de privacidad"
    }
  ]
};
