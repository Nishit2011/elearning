import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import loginReducer from "./reducers/loginReducer";
import signUpReducer from "./reducers/signUpReducer";
import courseReducer from "./reducers/courseReducer";
import lessonReducer from "./reducers/lessonReducer";
import userReducer from "./reducers/userReducer";
import deleteUserReducer from "./reducers/deleteUserReducer";

const reducer = combineReducers({
  signup: signUpReducer,
  login: loginReducer,
  course: courseReducer,
  lesson: lessonReducer,
  users: userReducer,
  deleteUser: deleteUserReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const initialState = {
  login: { data: userInfoFromStorage },
};

const middlewares = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
