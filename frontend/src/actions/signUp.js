import { SIGN_UP_FAILURE, SIGN_UP, SIGN_UP_SUCCESS } from "../types/types";
import baseURL from "../api/api";

export const signUp =
  (...data) =>
  async (dispatch) => {
    dispatch(signUpRequest());
    await baseURL
      .post("/signup", data[0])
      .then((response) => {
        dispatch(signUpRequestSuccess(response.data));
        localStorage.setItem("userInfo", JSON.stringify(response.data));
      })
      .catch((error) => dispatch(signUpRequestFailure(error)));
  };

const signUpRequest = () => {
  return {
    type: SIGN_UP,
  };
};

const signUpRequestSuccess = (...data) => {
  return {
    type: SIGN_UP_SUCCESS,
    payload: data[0],
  };
};

const signUpRequestFailure = (error) => {
  return {
    type: SIGN_UP_FAILURE,
    payload:
      error.response && error.response.data.error
        ? error.response.data.error
        : error.message,
  };
};
