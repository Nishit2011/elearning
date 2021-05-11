import {
  ADD_COURSES,
  ADD_COURSES_FAILURE,
  ADD_COURSES_SUCCESS,
} from "../types/types";
import baseURL from "../api/api";

export const addCourses =
  (...data) =>
  async (dispatch, getState) => {
    dispatch(addCoursesRequest());
    console.log(getState());

    // await baseURL
    //   .post("/course", data[0])
    //   .then((response) => {
    //     dispatch(addCoursesRequestSuccess(response.data));
    //     localStorage.setItem("userInfo", JSON.stringify(response.data));
    //   })
    //   .catch((error) => dispatch(addCoursesRequestFailure(error)));
  };

const addCoursesRequest = () => {
  return {
    type: ADD_COURSES,
  };
};

const addCoursesRequestSuccess = (...data) => {
  return {
    type: ADD_COURSES_SUCCESS,
    payload: data[0],
  };
};

const addCoursesRequestFailure = (error) => {
  return {
    type: ADD_COURSES_FAILURE,
    payload:
      error.response && error.response.data.error
        ? error.response.data.error
        : error.message,
  };
};
