import axios from "../axiosSetup";

export const addAddress = async (data) => {
  try {
    const response = await axios.post("/addresses", data);
    return response;
  } catch (error) {
    return error;
  }
};
