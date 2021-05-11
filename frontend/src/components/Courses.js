import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCourses } from "../actions/courses";
import { useHistory } from "react-router-dom";

const Courses = () => {
  const [token, setToken] = useState("");

  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.login);
  const history = useHistory();

  useEffect(() => {
    if (!data) {
      history.push("/login");
    }
  }, [data]);

  return (
    <div>
      <h1> courses</h1>
    </div>
  );
};

export default Courses;
