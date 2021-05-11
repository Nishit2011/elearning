import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import loginReducer from "./reducers/loginReducer";
import signUpReducer from "./reducers/signUpReducer";
import courseReducer from "./reducers/courseReducer";

const reducer = combineReducers({
  signup: signUpReducer,
  login: loginReducer,
  course: courseReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const initialState = {
  login: { userInfo: userInfoFromStorage },
};

const middlewares = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;