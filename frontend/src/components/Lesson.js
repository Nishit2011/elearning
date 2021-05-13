import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLesson, getAllLessons } from "../actions/lesson";

const Lesson = (props) => {
  const [courseId, setCourseId] = useState(0);
  const [lessonObj, setLessonObj] = useState({
    name: "",
    content: "",
    courseId: "",
  });
  const [flag, setFlag] = useState(false);
  const dispatch = useDispatch();
  const lessonResponse = useSelector((state) => state.lesson);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addLesson(lessonObj));
    setFlag(true);
  };

  useEffect(() => {
    dispatch(getAllLessons(props.location.state.courseId));
    setLessonObj({ ...lessonObj, courseId: props.location.state.courseId });
  }, []);

  useEffect(() => {
    dispatch(getAllLessons(props.location.state.courseId));
  }, [flag]);

  return (
    <div>
      <h2>Lessons for Course Id: {lessonObj.courseId}</h2>
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
