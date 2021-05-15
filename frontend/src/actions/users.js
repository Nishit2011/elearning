import {
  GET_ALL_USERS,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAILURE,
  DELETE_ALL_USERS,
  DELETE_ALL_USERS_SUCCESS,
  DELETE_ALL_USERS_FAILURE,
  DELETE_USER_BY_ID,
  DELETE_USER_BY_ID_SUCCESS,
  DELETE_USER_BY_ID_FAILURE,
} from "../types/types";
import baseURL from "../api/api";

export const getAllUsers = () => async (dispatch, getState) => {
  dispatch(getAllUsersRequest());
  const {
    login: { data },
  } = getState();

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${data.token}`,
    },
  };

  await baseURL
    .get("/allusers", config)
    .then((response) => {
      dispatch(getAllUsersSuccess(response.data));
    })
    .catch((error) => dispatch(getAllUsersFailure(error)));
};

export const getAllUsersRequest = () => {
  return {
    type: GET_ALL_USERS,
  };
};

export const getAllUsersSuccess = (...args) => {
  return {
    type: GET_ALL_USERS_SUCCESS,
    payload: args[0],
  };
};

export const getAllUsersFailure = (error) => {
  return {
    type: GET_ALL_USERS_FAILURE,
    payload:
      error.response && error.response.data.error
        ? error.response.data.error
        : error.message,
  };
};

export const deleteAllUsers = () => async (dispatch, getState) => {
  dispatch(deleteAllUsersRequest());
  const {
    login: { data },
  } = getState();

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${data.token}`,
    },
  };

  await baseURL
    .delete("/deleteusers", config)
    .then((response) => {
      dispatch(deleteAllUsersSuccess(response.data));
    })
    .catch((error) => dispatch(deleteAllUsersFailure(error)));
};

export const deleteAllUsersRequest = () => {
  return {
    type: DELETE_ALL_USERS,
  };
};

export const deleteAllUsersSuccess = (...args) => {
  return {
    type: DELETE_ALL_USERS_SUCCESS,
    payload: args[0],
  };
};

export const deleteAllUsersFailure = (error) => {
  return {
    type: DELETE_ALL_USERS_FAILURE,
    payload:
      error.response && error.response.data.error
        ? error.response.data.error
        : error.message,
  };
};

export const deleteUsersById = (id) => async (dispatch, getState) => {
  dispatch(deleteUsersByIdRequest());
  const {
    login: { data },
  } = getState();

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${data.token}`,
    },
  };

  await baseURL
    .delete(`/deleteuser/${id}`, config)
    .then((response) => {
      dispatch(deleteUsersByIdSuccess(response.data));
    })
    .catch((error) => dispatch(deleteUsersByIdFailure(error)));
};

export const deleteUsersByIdRequest = () => {
  return {
    type: DELETE_USER_BY_ID,
  };
};
export const deleteUsersByIdSuccess = (...args) => {
  console.log(args);
  return {
    type: DELETE_USER_BY_ID_SUCCESS,
    payload: args[0],
  };
};

export const deleteUsersByIdFailure = (error) => {
  return {
    type: DELETE_USER_BY_ID_FAILURE,
    payload:
      error.response && error.response.data.error
        ? error.response.data.error
        : error.message,
  };
};
