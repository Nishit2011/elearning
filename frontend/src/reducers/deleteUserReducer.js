import {
  DELETE_ALL_USERS,
  DELETE_ALL_USERS_SUCCESS,
  DELETE_ALL_USERS_FAILURE,
  DELETE_USER_BY_ID,
  DELETE_USER_BY_ID_SUCCESS,
  DELETE_USER_BY_ID_FAILURE,
} from "../types/types";

const deleteUserReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_ALL_USERS:
      return { ...state, loading: true };
    case DELETE_ALL_USERS_SUCCESS:
      return { ...state, data: action.payload, loading: false };
    case DELETE_ALL_USERS_FAILURE:
      return { ...state, error: action.payload, loading: false };

    case DELETE_USER_BY_ID:
      return { ...state, loading: true };
    case DELETE_USER_BY_ID_SUCCESS:
      console.log(action.payload);
      return { ...state, deleteMsg: action.payload, loading: false };
    case DELETE_USER_BY_ID_FAILURE:
      return {
        ...state,
        error: action.payload,
        deleteMsg: false,
        loading: false,
      };
    default:
      return state;
  }
};

export default deleteUserReducer;
