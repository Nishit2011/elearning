import React, { useState, useEffect } from "react";
import "./styles/confirmBox.css";

const ConfirmBox = (props) => {
  const [answer, setAnswer] = useState("");

  return (
    <div className="container">
      {/* <h3 class="heading">Confirm Box</h3> */}
      <div className="content">Are you sure you want to delete all users?</div>
      <button
        className="btn btn-yes"
        onClick={(e) => props.handleConfirm(e, "yes")}
      >
        {" "}
        YES
      </button>
      <button
        className="btn btn-no"
        onClick={(e) => props.handleConfirm(e, "no")}
      >
        NO
      </button>
    </div>
  );
};

export default ConfirmBox;
