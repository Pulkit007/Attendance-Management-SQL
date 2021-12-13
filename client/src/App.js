import "./App.css";
import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/routing/PrivateRoute";

import setAuthToken from "./utils/setAuthToken";
import { Provider } from "react-redux";
import store from "./store";
import Choose from "./components/auth/Choose";

//Authentication
import Alert from "./components/layout/Alert";
import Landing from "./components/layout/Landing/Landing";
import FacultyLogin from "./components/auth/faculty/Login";
import StudentLogin from "./components/auth/student/Login";

//Faculty
import FacultyHome from "./components/dashboard/faculty/FacultyHome";
import CreatePage from "./components/dashboard/faculty/CreatePage";
import Archive from "./components/dashboard/faculty/Archive";
import FacultyAttendance from "./components/dashboard/faculty/Attendance";
import FacRoom from "./components/dashboard/faculty/Room";
import FacChatpage from "./components/dashboard/faculty/Chatpage";
import StudentDetails from "./components/dashboard/faculty/StudentDetails";

//Student
import StudentHome from "./components/dashboard/student/StudentHome";
import StudentAttendance from "./components/dashboard/student/Attendance";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Route exact path="/" component={Landing} />
          <Alert />
          <Switch>
            <Route exact path="/login" component={Choose} />
            <Route exact path="/register" component={Choose} />
            <Route exact path="/faculty/login" component={FacultyLogin} />
            <Route exact path="/student/login" component={StudentLogin} />
            <PrivateRoute
              exact
              path="/faculty/courses"
              component={FacultyHome}
            />
            <PrivateRoute exact path="/faculty/chat" component={FacRoom} />
            <PrivateRoute
              exact
              path="/faculty/chat/:course/:year"
              component={FacChatpage}
            />
            <PrivateRoute exact path="/faculty/archives" component={Archive} />
            <PrivateRoute exact path="/faculty/create" component={CreatePage} />
            <PrivateRoute
              exact
              path="/faculty/courses/:course"
              component={FacultyAttendance}
            />
            <PrivateRoute
              exact
              path="/faculty/attendance/:course/:roll/:year"
              component={StudentDetails}
            />
            <PrivateRoute
              exact
              path="/student/courses"
              component={StudentHome}
            />
            <PrivateRoute
              exact
              path="/student/courses/:course"
              component={StudentAttendance}
            />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
