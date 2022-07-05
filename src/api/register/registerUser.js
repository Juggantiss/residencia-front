import axios from "axios";
import axiosSetup from "../axiosSetup";

export const registerUser = async (data) => {
  try {
    const URL_REGISTER_USER = `${process.env.REACT_APP_API_URL}/auth/local/register`;
    const response = await axios.post(URL_REGISTER_USER, data);
    console.log(
      "🚀 ~ file: registerUser.js ~ line 8 ~ registerUser ~ response",
      response
    );
    const user = response?.data?.user?.id;
    console.log(
      "🚀 ~ file: registerUser.js ~ line 10 ~ registerUser ~ user",
      user
    );
    const jwt = response?.data?.jwt;
    console.log(
      "🚀 ~ file: registerUser.js ~ line 12 ~ registerUser ~ jwt",
      jwt
    );
    window.localStorage.setItem("jwt", jwt);
    if (jwt) {
      const responseAspirant = await axiosSetup.post(
        "/aspirants",
        {
          data: { user }
        },
        {
          headers: {
            Authorization: "Bearer " + jwt
          }
        }
      );
      console.log(
        "🚀 ~ file: registerUser.js ~ line 18 ~ registerUser ~ responseAspirant",
        responseAspirant
      );
      return responseAspirant;
    } else {
      throw new Error();
    }
  } catch (error) {
    return error;
  }
};
