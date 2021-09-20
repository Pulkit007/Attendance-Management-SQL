import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { setAlert } from "../../../actions/alert";
import { loginStudent, studentRegister } from "../../../actions/auth";
import PropTypes from "prop-types";
import store from "../../../store";
import "../Slide.css";

const StudentLogin = ({
  setAlert,
  studentRegister,
  loginStudent,
  isAuthenticated,
}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    roll: "",
    dept: "",
    year: "",
  });

  const { name, email, password, roll, dept, year } = formData;

  let signUpButton = document.getElementById("signUp");
  let signInButton = document.getElementById("signIn");
  let container = document.getElementById("container");

  useEffect(() => {
    signUpButton = document.getElementById("signUp");
    signInButton = document.getElementById("signIn");
    container = document.getElementById("container");
  }, []);

  const addClass = () => {
    container.classList.add("right-panel-active");
  };

  const removeClass = () => {
    container.classList.remove("right-panel-active");
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const login = async (e) => {
    e.preventDefault();
    loginStudent(email, password);
  };

  const register = async (e) => {
    e.preventDefault();
    studentRegister({ name, email, password, roll, dept, year });
  };

  if (isAuthenticated) {
    return <Redirect to="/student/courses" />;
  }

  return (
    <div className="body">
      <h1 style={{ textAlign: "center", fontWeight: "700", fontSize: "55" }}>
        <b>Student Login</b>
      </h1>

      <div className="container" id="container" style={{ height: "580px" }}>
        <div className="form-container sign-up-container">
          <form action="#" onSubmit={(e) => register(e)}>
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="Name"
              value={name}
              name="name"
              onChange={(e) => onChange(e)}
              autoComplete="off"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              name="email"
              onChange={(e) => onChange(e)}
              autoComplete="off"
            />
            <input
              type="text"
              placeholder="Roll Number"
              value={roll}
              name="roll"
              onChange={(e) => onChange(e)}
              autoComplete="off"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              name="password"
              onChange={(e) => onChange(e)}
              autoComplete="off"
            />
            <input
              type="text"
              placeholder="Department"
              value={dept}
              name="dept"
              onChange={(e) => onChange(e)}
              autoComplete="off"
            />
            <input
              type="text"
              placeholder="Year Of Joining"
              value={year}
              name="year"
              onChange={(e) => onChange(e)}
              autoComplete="off"
            />
            <button type="submit">Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form action="#" onSubmit={(e) => login(e)}>
            <h1>Sign in</h1>
            <input
              type="email"
              placeholder="Email"
              value={email}
              name="email"
              onChange={(e) => onChange(e)}
              autoComplete="off"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              name="password"
              onChange={(e) => onChange(e)}
              autoComplete="off"
            />
            <button>Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Already have an account!</h1>
              <p>Please login to access your profile</p>
              <button onClick={removeClass} className="ghost" id="signIn">
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Don't have an account?</h1>
              <p>Go ahead and create an account for yourself!!</p>
              <button onClick={addClass} className="ghost" id="signUp">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

StudentLogin.propTypes = {
  loginStudent: PropTypes.func.isRequired,
  studentRegister: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  setAlert,
  loginStudent,
  studentRegister,
})(StudentLogin);
