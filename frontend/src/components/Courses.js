import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCourse, deleteCourseById, getAllCourses } from "../actions/courses";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const Courses = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { data } = useSelector((state) => state.login);
  const { courses } = useSelector((state) => state.course);
  const { deleteCourseMsg } = useSelector((state) => state.course);

  const [courseObj, setCourseObj] = useState({
    title: "",
    content: "",
    subscribe: false,
    author: {},
  });
  const [flag, setFlag] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCourseObj({ ...courseObj, author: data });
    dispatch(addCourse(courseObj));
    setFlag(true);
  };

  const handleDeleteCourse = (e, courseId) => {
    e.preventDefault();
    console.log(courseId);
    dispatch(deleteCourseById(courseId));
  };

  useEffect(() => {
    if (!data) {
      history.push("/login");
    } else {
      dispatch(getAllCourses(data.user._id));
    }
  }, [deleteCourseMsg]);

  useEffect(() => {
    if (flag) dispatch(getAllCourses(data.user._id));
  }, [flag]);

  return (
    <div>
      <h1> Courses</h1>
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
              <button onClick={(e) => handleDeleteCourse(e, el._id)}>
                Delete
              </button>
              <Link
                to={{
                  pathname: "/lessons",
                  state: {
                    courseId: el._id,
                    courseName: el.title,
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
