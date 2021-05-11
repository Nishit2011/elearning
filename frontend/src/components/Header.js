import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/login";
import { useHistory } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();

  const history = useHistory();
  //const { user } = useSelector((state) => state.login.data);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push("/login");
  };

  return (
    <div>
      Header
      <button onClick={(e) => handleLogout(e)}>Logout</button>
    </div>
  );
};

export default Header;
