import {
  ADD_LESSON,
  ADD_LESSON_SUCCESS,
  ADD_LESSON_FAILURE,
  GET_ALL_LESSONS,
  GET_ALL_LESSONS_SUCCESS,
  GET_ALL_LESSONS_FAILURE,
  DELETE_LESSON_BY_ID,
  DELETE_LESSON_BY_ID_SUCCESS,
  DELETE_LESSON_BY_ID_FAILURE,
} from "../types/types";

const lessonReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_LESSON_SUCCESS:
      return { ...state, data: action.payload, loading: false };
    case ADD_LESSON_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case ADD_LESSON:
      return { ...state, loading: true };
    case GET_ALL_LESSONS_SUCCESS:
      return { ...state, lessons: action.payload, loading: false };
    case GET_ALL_LESSONS_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case GET_ALL_LESSONS:
      return { ...state, loading: true };

    case DELETE_LESSON_BY_ID:
      return { ...state, loading: true };
    case DELETE_LESSON_BY_ID_SUCCESS:
      return { ...state, deleteLessonMsg: action.payload, loading: false };
    case DELETE_LESSON_BY_ID_FAILURE:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export default lessonReducer;
