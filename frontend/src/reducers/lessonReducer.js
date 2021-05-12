import {
  ADD_LESSON,
  ADD_LESSON_SUCCESS,
  ADD_LESSON_FAILURE,
  // GET_ALL_LESSONS,
  // GET_ALL_LESSONS_SUCCESS,
  // GET_ALL_LESSONS_FAILURE,
} from "../types/types";

const lessonReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_LESSON_SUCCESS:
      return { ...state, data: action.payload, loading: false };
    case ADD_LESSON_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case ADD_LESSON:
      return { ...state, loading: true };
    //   case GET_ALL_LESSONS_SUCCESS:
    //     return { ...state, LESSONs: action.payload, loading: false };
    //   case GET_ALL_LESSONS_FAILURE:
    //     return { ...state, error: action.payload, loading: false };
    //   case GET_ALL_LESSONS:
    //     return { ...state, loading: true };
    default:
      return state;
  }
};

export default lessonReducer;
