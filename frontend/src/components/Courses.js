import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCourse, getAllCourses } from "../actions/courses";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const Courses = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [courseObj, setCourseObj] = useState({
    title: "",
    content: "",
    subscribe: false,
    author: {},
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedCourseObj = { ...courseObj };
    updatedCourseObj.author = data;

    dispatch(addCourse(updatedCourseObj));
  };

  // useEffect(() => {
  //   if (data) {
  //     history.push("/lesson");
  //   }
  // }, [data]);
  const { data } = useSelector((state) => state.login);
  const { courses } = useSelector((state) => state.course);

  useEffect(() => {
    if (!data) {
      history.push("/login");
    } else {
      dispatch(getAllCourses(data.user._id));
    }
  }, []);

  return (
    <div>
      <h1> courses</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="Enter title"
          onChange={(e) =>
            setCourseObj({ ...courseObj, title: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Enter content"
          onChange={(e) =>
            setCourseObj({ ...courseObj, content: e.target.value })
          }
        />
        <button>Add Course</button>
      </form>

      <p>List of all courses</p>
      <ul>
        {courses ? (
          courses.courses.map((el) => (
            <li key={el._id}>
              {el.title}
              <Link
                to={{
                  pathname: "/lessons",
                  state: {
                    courseId: el._id,
                  },
                }}
              >
                Add Lesson
              </Link>{" "}
            </li>
          ))
        ) : (
          <>No Courses available</>
        )}
      </ul>
    </div>
  );
};

export default Courses;
