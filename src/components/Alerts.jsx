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
