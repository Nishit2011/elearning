import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./styles/signup.css";
import { signUp } from "../actions/signUp";

const SignUp = () => {
  const [signUpObj, setSignUpObj] = useState({
    firstName: "",
    lastName: "",
    email: "",
    pincode: 99,
    password: "",
    streetAddress: "",
    city: "",
    state: "",
    country: "",
  });
  const [responseData, setResponseData] = useState({});
  const dispatch = useDispatch();
  const signup = useSelector((state) => state.signup.data);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signUp(signUpObj));
  };

  useEffect(() => {
    setResponseData(signup);
  }, [signup]);

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="container">
          <div>
            <input
              type="text"
              placeholder="Enter first name"
              onChange={(e) =>
                setSignUpObj({ ...signUpObj, firstName: e.target.value })
              }
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Enter last name"
              onChange={(e) =>
                setSignUpObj({ ...signUpObj, lastName: e.target.value })
              }
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Enter pincode"
              onChange={(e) =>
                setSignUpObj({ ...signUpObj, pincode: e.target.value })
              }
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Enter email"
              onChange={(e) =>
                setSignUpObj({ ...signUpObj, email: e.target.value })
              }
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Enter password"
              onChange={(e) =>
                setSignUpObj({ ...signUpObj, password: e.target.value })
              }
            />
          </div>
          <div>
            <input type="text" placeholder="Confirm password" />
          </div>
          <div>
            <input
              type="text"
              placeholder="Enter Street Address"
              onChange={(e) =>
                setSignUpObj({ ...signUpObj, streetAddress: e.target.value })
              }
            />
          </div>
          <input
            type="text"
            placeholder="Enter Country"
            onChange={(e) =>
              setSignUpObj({ ...signUpObj, country: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Enter City"
            onChange={(e) =>
              setSignUpObj({ ...signUpObj, city: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Enter State"
            onChange={(e) =>
              setSignUpObj({ ...signUpObj, state: e.target.value })
            }
          />
          <button>Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
