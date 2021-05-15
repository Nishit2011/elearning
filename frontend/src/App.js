import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Courses from "./components/Courses";
import Header from "./components/Header";
import Lesson from "./components/Lesson";
import Users from "./components/Users";
import ConfirmBox from "./components/ConfirmBox";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/" component={SignUp}></Route>
          <Route exact path="/courses" component={Courses}></Route>
          <Route exact path="/lessons" component={Lesson}></Route>
          <Route exact path="/users" component={Users}></Route>
          <Route exact path="/confirm" component={ConfirmBox}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
