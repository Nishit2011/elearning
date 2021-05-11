import { SIGN_UP_FAILURE, SIGN_UP, SIGN_UP_SUCCESS } from "../types/types";

const signUpReducer = (state = {}, action) => {
  switch (action.type) {
    case SIGN_UP_SUCCESS:
      return { ...state, data: action.payload, error: {}, loading: false };
    case SIGN_UP_FAILURE:
      return { ...state, data: [], error: action.payload, loading: false };
    case SIGN_UP:
      return { ...state, loading: true };
    default:
      return state;
  }
};

export default signUpReducer;
