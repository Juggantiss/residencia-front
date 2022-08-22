import { Error } from "../../components/Alerts";
import axios from "../axiosSetup";

export const updateAspirant = async (values, id) => {
  try {
    const response = await axios.put("/aspirants/" + id, {
      data: values
    });
    return response;
  } catch (error) {
    Error(
      "Ah ocurrido un error al actualizar el estado del aspirante",
      error?.message
    );
    return null;
  }
};
