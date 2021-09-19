import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../../layout/Spinner";
import Sidebar from "./Sidebar";
import { getCourses } from "../../../actions/faculty";
import "./style.css";
import Card from "./Card";
import { loadFaculty } from "../../../actions/auth";
import { logout } from "../../../actions/auth";

const FacultyHome = ({
  getCourses,
  logout,
  loadFaculty,
  faculty: { courses },
  auth: { user },
}) => {
  useEffect(() => {
    getCourses();
    loadFaculty();
  }, [getCourses]);

  let ongoing = courses.filter((course) => {
    if (course.archived == 0) return course;
  });

  return !user ? (
    <Spinner />
  ) : (
    <div className="grid-container">
      <header className="header">
        <div className="header__logo">Attendance DashBoard</div>
        <div className="responsive-sidebar">
          <div className="inner-responsive-sidebar">
            <Link
              style={{ color: "white", fontWeight: "500px" }}
              to="/faculty/courses"
            >
              <span className="">Dashboard</span>
            </Link>

            <Link
              style={{ color: "white", fontWeight: "500px" }}
              to="/faculty/create"
            >
              <span className="">Create Course</span>
            </Link>

            <Link
              style={{ color: "white", fontWeight: "500px" }}
              to="/faculty/archives"
            >
              <span>Archived courses</span>
            </Link>

            <Link to="/login" style={{ color: "white", fontWeight: "500px" }}>
              <span onClick={logout}>Logout</span>
            </Link>
          </div>
        </div>
      </header>

      <Sidebar user={user} />

      <main className="main">
        <div className="container_head">
          <div className="main-header">
            <div className="main-header__heading">
              <h1 style={{ fontWeight: "750px" }}>{user.name} </h1>
              <h4 style={{ fontSize: "28" }}>{user.dept} department faculty</h4>
            </div>
          </div>
        </div>

        <h1 style={{ paddingLeft: "26px" }}>Ongoing courses: </h1>
        <div className="main-overview" style={{ color: "white" }}>
          {ongoing.map((course) => (
            <ul className="card_container">
              <Card course={course} />
            </ul>
          ))}
        </div>

        <br />
      </main>

      <footer className="footer">
        <div className="footer__copyright">&copy; IIITDMJ</div>
        <div className="footer__signature">
          The Ultimate Attendance Management Tool
        </div>
      </footer>
    </div>
  );
};

FacultyHome.propTypes = {
  getCourses: PropTypes.func.isRequired,
  loadFaculty: PropTypes.func.isRequired,
  faculty: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  logout: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  faculty: state.faculty,
  auth: state.auth,
});

export default connect(mapStateToProps, { getCourses, loadFaculty, logout })(
  FacultyHome
);
