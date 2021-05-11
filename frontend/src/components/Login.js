import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/login";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [loginObj, setLoginObj] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login");
    const { email, password } = loginObj;
    dispatch(login(email, password));
  };

  const { loading, data, error } = useSelector((state) => state.login);
  const history = useHistory();

  useEffect(() => {
    if (data) {
      history.push("/courses");
    }
  }, [loading, data, error]);

  return (
    <div>
      <h3>Login</h3>
      {error ? error : ""}
      <form onSubmit={(e) => handleLogin(e)}>
        <input
          type="text"
          placeholder="Please enter email"
          onChange={(e) => setLoginObj({ ...loginObj, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Please enter password"
          onChange={(e) =>
            setLoginObj({ ...loginObj, password: e.target.value })
          }
        />
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
