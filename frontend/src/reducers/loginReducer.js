import { LOGIN, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT } from "../types/types";

const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, data: action.payload, loading: false };
    case LOGIN_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case LOGIN:
      return { ...state, loading: true };
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

export default loginReducer;
