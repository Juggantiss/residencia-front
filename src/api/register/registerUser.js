import axios from "axios";

export const registerUser = async (data) => {
  try {
    const URL_REGISTER_USER = `${process.env.REACT_APP_API_URL}/auth/local/register`;
    const response = await axios.post(URL_REGISTER_USER, data);
    return response;
  } catch (error) {
    return error;
  }
};
