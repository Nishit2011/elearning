import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLesson, getAllLessons } from "../actions/lesson";
import { useHistory } from "react-router-dom";

const Lesson = (props) => {
  const [courseName, setCourseName] = useState("");
  const [lessonObj, setLessonObj] = useState({
    name: "",
    content: "",
    courseId: "",
  });
  const [flag, setFlag] = useState(false);
  const dispatch = useDispatch();
  const lessonResponse = useSelector((state) => state.lesson);
  const { data } = useSelector((state) => state.login);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addLesson(lessonObj));
    setFlag(true);
  };

  useEffect(() => {
    // console.log(props.location.state.courseName);
    if (!data) {
      history.push("/login");
    } else {
      if (!props.location.state) {
        history.push("/courses");
      } else {
        console.log(props.location);
        dispatch(getAllLessons(props.location.state.courseId));
        setLessonObj({ ...lessonObj, courseId: props.location.state.courseId });
        setCourseName(props.location.state.courseName);
      }
    }
  }, []);

  useEffect(() => {
    if (props.location.state) {
      dispatch(getAllLessons(props.location.state.courseId));
    }
  }, [flag]);

  return (
    <div>
      <h2>Lessons for Course Id: {courseName}</h2>
      <button onClick={() => history.push("/courses")}>Back</button>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="Enter name of lesson"
          onChange={(e) => setLessonObj({ ...lessonObj, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Enter content of lesson"
          onChange={(e) =>
            setLessonObj({ ...lessonObj, content: e.target.value })
          }
        />
        <button>Add Lesson</button>
      </form>
      <p>Lessons: </p>
      <ul>
        {lessonResponse.lessons ? (
          lessonResponse.lessons.lessons.map((el) => {
            return (
              <li key={el._id}>
                {el.name} -------- {el.content}
              </li>
            );
          })
        ) : (
          <>No lessons available</>
        )}
      </ul>
    </div>
  );
};

export default Lesson;
