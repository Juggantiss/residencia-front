import axios from "../axiosSetup";

export const updateAspirant = async (values, id) => {
  try {
    const response = await axios.put("/aspirants/" + id, {
      data: values
    });
    return response;
  } catch (error) {
    return error;
  }
};
