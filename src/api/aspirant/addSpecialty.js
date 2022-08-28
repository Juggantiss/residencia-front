import { Error } from "../../components/Alerts";
import axios from "../axiosSetup";

export const addSpecialty = async (values, id) => {
  try {
    const { schoolProcedence, specialty } = values;
    const response = await axios.post("/specialty-users", {
      data: { aspirant: id, specialty }
    });
    if (response) {
      const responseSchool = await axios.put("/aspirants/" + id, {
        data: { schoolProcedence }
      });
      return responseSchool;
    }
  } catch (error) {
    Error(
      "Ah ocurrido un error al registrar los datos de especialidad",
      error?.message
    );
    return null;
  }
};
