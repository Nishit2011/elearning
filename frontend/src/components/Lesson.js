import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLesson } from "../actions/lesson";

const Lesson = (props) => {
  const [courseId, setCourseId] = useState(0);
  const [lessonObj, setLessonObj] = useState({
    name: "",
    content: "",
    courseId: "",
  });
  const dispatch = useDispatch();
  const lessonResponse = useSelector((state) => state.lesson);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addLesson(lessonObj));
  };

  useEffect(() => {
    console.log(props.location.state.courseId);
    setLessonObj({ ...lessonObj, courseId: props.location.state.courseId });
  }, []);

  return (
    <div>
      {console.log(lessonResponse)}
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
    </div>
  );
};

export default Lesson;
