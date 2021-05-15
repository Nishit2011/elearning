import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteAllUsers, deleteUsersById, getAllUsers } from "../actions/users";
import { useHistory } from "react-router-dom";
import ConfirmBox from "./ConfirmBox";

const Users = (props) => {
  const [deleteFlag, setDeleteFlag] = useState(false);
  const [deleteByIdFlag, setDeleteByIdFlag] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(0);

  const dispatch = useDispatch();
  const history = useHistory();
  const res = useSelector((state) => state.users);
  const { data } = useSelector((state) => state.login);
  const { deleteMsg } = useSelector((state) => state.deleteUser);

  const handleDeleteById = (e, id) => {
    e.preventDefault();
    setDeleteFlag(true);
    setDeleteUserId(id);
    setDeleteByIdFlag(true);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setDeleteFlag(true);
  };
  const handleConfirm = (e, val) => {
    e.preventDefault();
    if (val === "yes" && deleteByIdFlag === false) {
      dispatch(deleteAllUsers());
    } else if (val === "yes" && deleteByIdFlag) {
      dispatch(deleteUsersById(deleteUserId));
    }
    setDeleteFlag(false);
  };

  useEffect(() => {
    if (!data) {
      history.push("/login");
    } else {
      dispatch(getAllUsers());
    }
  }, [dispatch, history, deleteMsg]);

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {res.users ? (
          res.users.users.map((el) => {
            return (
              <li key={el._id}>
                {el.firstName} {el.lastName}{" "}
                <span>
                  <button onClick={(e) => handleDeleteById(e, el._id)}>
                    Delete
                  </button>
                </span>
              </li>
            );
          })
        ) : (
          <>No data available</>
        )}
      </ul>
      <button onClick={(e) => handleDelete(e)}>DELETE ALL</button>
      {deleteFlag ? <ConfirmBox handleConfirm={handleConfirm} /> : <></>}
    </div>
  );
};

export default Users;
