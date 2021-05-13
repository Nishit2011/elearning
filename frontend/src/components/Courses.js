import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCourse, getAllCourses } from "../actions/courses";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const Courses = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { data } = useSelector((state) => state.login);
  const { courses } = useSelector((state) => state.course);

  const [courseObj, setCourseObj] = useState({
    title: "",
    content: "",
    subscribe: false,
    author: {},
  });
  const [flag, setFlag] = useState(false);

  const [courseList, setCourseList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCourseObj({ ...courseObj, author: data });
    dispatch(addCourse(courseObj));
    setFlag(true);
  };

  useEffect(() => {
    console.log(courseList);
  }, [courseList]);

  useEffect(() => {
    if (!data) {
      history.push("/login");
    } else {
      dispatch(getAllCourses(data.user._id));
    }
  }, []);

  useEffect(() => {
    if (flag) dispatch(getAllCourses(data.user._id));
  }, [flag]);

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
