import {
  ADD_COURSE,
  ADD_COURSE_SUCCESS,
  ADD_COURSE_FAILURE,
  GET_ALL_COURSES,
  GET_ALL_COURSES_SUCCESS,
  GET_ALL_COURSES_FAILURE,
} from "../types/types";

const courseReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_COURSE_SUCCESS:
      return { ...state, data: action.payload, loading: false };
    case ADD_COURSE_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case ADD_COURSE:
      return { ...state, loading: true };
    case GET_ALL_COURSES_SUCCESS:
      return { ...state, courses: action.payload, loading: false };
    case GET_ALL_COURSES_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case GET_ALL_COURSES:
      return { ...state, loading: true };
    default:
      return state;
  }
};

export default courseReducer;
