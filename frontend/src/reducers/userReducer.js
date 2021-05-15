import {
  GET_ALL_USERS,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAILURE,
} from "../types/types";

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return { ...state, loading: true };
    case GET_ALL_USERS_SUCCESS:
      return { ...state, users: action.payload, loading: false };
    case GET_ALL_USERS_FAILURE:
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
};

export default userReducer;
