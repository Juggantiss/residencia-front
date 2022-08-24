import validateCurp from "../../utils/validateCurp";

export const REGISTER_SCHEMA = {
  curp: [
    {
      required: true,
      validator: (_, value) =>
        validateCurp(value) === "Válido"
          ? Promise.resolve()
          : Promise.reject(new Error("Ingresa una curp válida"))
    }
  ],
  name: [
    {
      required: true,
      message: "Por favor ingresa un nombre"
    },
    {
      pattern:
        /^[a-zA-ZÀ-ÿ\u00f1\u00d1]([a-zA-ZÀ-ÿ\u00f1\u00d1 ]*)[a-zA-ZÀ-ÿ\u00f1\u00d1]$/,
      message: "El nombre solo debe incluir letras"
    }
  ],
  firstLastName: [
    {
      required: true,
      message: "Por favor ingresa tu apellido paterno"
    },
    {
      pattern:
        /^[a-zA-ZÀ-ÿ\u00f1\u00d1]([a-zA-ZÀ-ÿ\u00f1\u00d1 ]*)[a-zA-ZÀ-ÿ\u00f1\u00d1]$/,
      message: "El apellido paterno solo debe incluir letras"
    }
  ],
  secondLastName: [
    {
      required: true,
      message: "Por favor ingresa tu apellido materno"
    },
    {
      pattern:
        /^[a-zA-ZÀ-ÿ\u00f1\u00d1]([a-zA-ZÀ-ÿ\u00f1\u00d1 ]*)[a-zA-ZÀ-ÿ\u00f1\u00d1]$/,
      message: "El apellido materno solo debe incluir letras"
    }
  ],
  email: [
    {
      required: true,
      message: "Por favor ingresa tu correo"
    },
    {
      type: "email",
      message: "Ingresa un correo válido"
    }
  ],
  password: [
    {
      required: true,
      message: "Por favor ingresa una contraseña"
    },
    {
      min: 8,
      message: "La contraseña debe tener mínimo 8 carácteres"
    }
  ],
  confirmPassword: [
    {
      required: true,
      message: "Por favor confirma tu contraseña"
    },
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue("password") === value) {
          return Promise.resolve();
        }

        return Promise.reject(new Error("Las contraseñas no coinciden"));
      }
    })
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
      validator: (_, value) =>
        value
          ? Promise.resolve()
          : Promise.reject(
              new Error("Debes de aceptar las políticas de privacidad")
            )
    }
  ]
};
