import {
  ADD_COURSE,
  ADD_COURSE_FAILURE,
  ADD_COURSE_SUCCESS,
  GET_ALL_COURSES,
  GET_ALL_COURSES_SUCCESS,
  GET_ALL_COURSES_FAILURE,
  DELETE_COURSE_BY_ID,
  DELETE_COURSE_BY_ID_SUCCESS,
  DELETE_COURSE_BY_ID_FAILURE,
} from "../types/types";
import baseURL from "../api/api";

export const addCourse =
  (...args) =>
  async (dispatch, getState) => {
    dispatch(addCourseRequest());
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
      .post("/course", args[0], config)
      .then((response) => {
        dispatch(addCourseRequestSuccess(response.data));
      })
      .catch((error) => dispatch(addCourseRequestFailure(error)));
  };

const addCourseRequest = () => {
  return {
    type: ADD_COURSE,
  };
};

const addCourseRequestSuccess = (...args) => {
  return {
    type: ADD_COURSE_SUCCESS,
    payload: args[0],
  };
};

const addCourseRequestFailure = (error) => {
  return {
    type: ADD_COURSE_FAILURE,
    payload:
      error.response && error.response.data.error
        ? error.response.data.error
        : error.message,
  };
};

export const getAllCourses = (userId) => async (dispatch, getState) => {
  console.log(userId);
  dispatch(getAllCoursesRequest());

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
    .get(`/user/${userId}/courses`, config)
    .then((response) => {
      dispatch(getAllCoursesRequestSuccess(response.data));
    })
    .catch((error) => dispatch(getAllCoursesRequestFailure(error)));
};

const getAllCoursesRequest = () => {
  return {
    type: GET_ALL_COURSES,
  };
};
const getAllCoursesRequestSuccess = (...args) => {
  return {
    type: GET_ALL_COURSES_SUCCESS,
    payload: args[0],
  };
};
const getAllCoursesRequestFailure = (error) => {
  return {
    type: GET_ALL_COURSES_FAILURE,
    payload:
      error.response && error.response.data.error
        ? error.response.data.error
        : error.message,
  };
};

export const deleteCourseById = (courseId) => async (dispatch, getState) => {
  dispatch(deleteCourseByIdRequest());
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
    .delete(`/${courseId}/course`, config)
    .then((response) => {
      dispatch(deleteCourseByIdSuccess(response.data));
    })
    .catch((error) => dispatch(deleteCourseByIdFailure(error)));
};

export const deleteCourseByIdRequest = () => {
  return {
    type: DELETE_COURSE_BY_ID,
  };
};
export const deleteCourseByIdSuccess = (...args) => {
  console.log(args);
  return {
    type: DELETE_COURSE_BY_ID_SUCCESS,
    payload: args[0],
  };
};

export const deleteCourseByIdFailure = (error) => {
  return {
    type: DELETE_COURSE_BY_ID_FAILURE,
    payload:
      error.response && error.response.data.error
        ? error.response.data.error
        : error.message,
  };
};
