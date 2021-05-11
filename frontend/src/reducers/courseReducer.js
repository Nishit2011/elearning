import {
  ADD_COURSES,
  ADD_COURSES_SUCCESS,
  ADD_COURSES_FAILURE,
} from "../types/types";

const courseReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_COURSES_SUCCESS:
      return { ...state, data: action.payload, loading: false };
    case ADD_COURSES_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case ADD_COURSES:
      return { ...state, loading: true };
    default:
      return state;
  }
};

export default courseReducer;
