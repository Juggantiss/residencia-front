import { Error } from "../../components/Alerts";
import axios from "../axiosSetup";

export const addAddress = async (values) => {
  try {
    const response = await axios.post("/addresses", { data: values });
    return response;
  } catch (error) {
    Error(
      "Ah ocurrido un error al registrar los datos generales",
      error?.message
    );
    return null;
  }
};
