import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const Warning = (title, text, confirmText, action) => {
  MySwal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    reverseButtons: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: confirmText,
    cancelButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed) {
      action();
    }
  });
};

export const Error = (title, text, action) => {
  MySwal.fire({
    icon: "error",
    title,
    text,
    confirmButtonText: "Aceptar"
  }).then((result) => {
    if (result.isConfirmed && action) {
      action();
    }
  });
};

export const ModalInput = async (label) => {
  const { value: text } = await MySwal.fire({
    input: "textarea",
    inputLabel: label,
    inputPlaceholder: "Escribe tu mensaje aquí",
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    confirmButtonText: "Enviar",
    inputValidator: (value) => {
      if (!value) {
        return "Upps... Esto no puede estar vacío";
      }
    }
  });

  return text;
};
