import logo from "./logo.svg";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Courses from "./components/Courses";
import Header from "./components/Header";
import Lesson from "./components/Lesson";

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
        </Switch>
      </div>
    </Router>
  );
}

export default App;
