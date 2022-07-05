import axios from "../axiosSetup";

export const addAddress = async (values) => {
  try {
    const response = await axios.post("/addresses", { data: values });
    return response;
  } catch (error) {
    return error;
  }
};
