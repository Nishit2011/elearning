import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLesson, deleteLessonById, getAllLessons } from "../actions/lesson";
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
  const { deleteLessonMsg } = useSelector((state) => state.lesson);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addLesson(lessonObj));
    setFlag(true);
  };

  const handleLessonDelete = (e, courseId, lessonId) => {
    console.log(courseId, lessonId);
    e.preventDefault();
    dispatch(deleteLessonById(courseId, lessonId));
  };

  useEffect(() => {
    // console.log(props.location.state.courseName);
    if (!data) {
      history.push("/login");
    } else {
      if (!props.location.state) {
        history.push("/courses");
      } else {
        dispatch(getAllLessons(props.location.state.courseId));
        setLessonObj({ ...lessonObj, courseId: props.location.state.courseId });
        setCourseName(props.location.state.courseName);
      }
    }
  }, [data, deleteLessonMsg]);

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
                <button
                  onClick={(e) =>
                    handleLessonDelete(e, props.location.state.courseId, el._id)
                  }
                >
                  DELETE
                </button>
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
