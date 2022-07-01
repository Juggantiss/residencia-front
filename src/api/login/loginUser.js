import axios from "axios";

export const loginUser = async (data) => {
  try {
    const URL_LOGIN_USER = `${process.env.REACT_APP_API_URL}/auth/local`;
    const response = await axios.post(URL_LOGIN_USER, data);
    return response;
  } catch (error) {
    return error;
  }
};
