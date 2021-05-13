import {
  ADD_LESSON,
  ADD_LESSON_FAILURE,
  ADD_LESSON_SUCCESS,
  GET_ALL_LESSONS,
  GET_ALL_LESSONS_SUCCESS,
  GET_ALL_LESSONS_FAILURE,
} from "../types/types";
import baseURL from "../api/api";

export const addLesson =
  (...args) =>
  async (dispatch, getState) => {
    dispatch(addLessonRequest());
    const {
      login: { data },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.token}`,
      },
    };
    const { courseId } = args[0];
    console.log(args[0]);
    await baseURL
      .post(`${courseId}/lesson`, args[0], config)
      .then((response) => {
        dispatch(addLessonRequestSuccess(response.data));
      })
      .catch((error) => dispatch(addLessonRequestFailure(error)));
  };

const addLessonRequest = () => {
  return {
    type: ADD_LESSON,
  };
};

const addLessonRequestSuccess = (...args) => {
  return {
    type: ADD_LESSON_SUCCESS,
    payload: args[0],
  };
};

const addLessonRequestFailure = (error) => {
  return {
    type: ADD_LESSON_FAILURE,
    payload:
      error.response && error.response.data.error
        ? error.response.data.error
        : error.message,
  };
};

export const getAllLessons = (courseId) => async (dispatch, getState) => {
  console.log(courseId);
  dispatch(getAllLessonsRequest());

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
    .get(`/${courseId}/lessons`, config)
    .then((response) => {
      dispatch(getAllLessonsRequestSuccess(response.data));
    })
    .catch((error) => dispatch(getAllLessonsRequestFailure(error)));
};

const getAllLessonsRequest = () => {
  return {
    type: GET_ALL_LESSONS,
  };
};
const getAllLessonsRequestSuccess = (...args) => {
  return {
    type: GET_ALL_LESSONS_SUCCESS,
    payload: args[0],
  };
};
const getAllLessonsRequestFailure = (error) => {
  return {
    type: GET_ALL_LESSONS_FAILURE,
    payload:
      error.response && error.response.data.error
        ? error.response.data.error
        : error.message,
  };
};
