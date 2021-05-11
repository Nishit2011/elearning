import { LOGIN, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT } from "../types/types";
import baseURL from "../api/api";

export const login = (email, password) => async (dispatch) => {
  dispatch(loginRequest());
  await baseURL
    .post("/login", { email, password })
    .then((response) => {
      dispatch(loginRequestSuccess(response.data));
      localStorage.setItem("userInfo", JSON.stringify(response.data));
    })
    .catch((error) => {
      dispatch(loginRequestFailure(error));
    });
};

const loginRequest = () => {
  return {
    type: LOGIN,
  };
};

const loginRequestSuccess = (...data) => {
  return {
    type: LOGIN_SUCCESS,
    payload: data[0],
  };
};

const loginRequestFailure = (error) => {
  console.log(error.response.data.error);
  return {
    type: LOGIN_FAILURE,
    payload:
      error.response && error.response.data.error
        ? error.response.data.error
        : error.message,
  };
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: LOGOUT });
};
