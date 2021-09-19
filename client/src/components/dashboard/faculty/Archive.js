import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Spinner from "../../layout/Spinner";
import { connect } from "react-redux";
import { getCourses } from "../../../actions/faculty";
import { logout } from "../../../actions/auth";
import Card from "./Card";
import Sidebar from "./Sidebar";
import "./style.css";
import { loadFaculty } from "../../../actions/auth";

const Archive = ({
  getCourses,
  logout,
  loadFaculty,
  faculty: { loading, courses },
  auth: { user },
}) => {
  useEffect(() => {
    loadFaculty();
    getCourses();
  }, [getCourses]);

  let archived = courses.filter((course) => {
    if (course.archived == 1) return course;
  });

  return loading ? (
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

        <h1 style={{ paddingLeft: "26px" }}>Archived courses: </h1>
        <div className="main-overview" style={{ color: "white" }}>
          {archived.map((course) => (
            <ul>
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

Archive.propTypes = {
  getCourses: PropTypes.func.isRequired,
  faculty: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  loadFaculty: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  faculty: state.faculty,
  auth: state.auth,
});

export default connect(mapStateToProps, { getCourses, logout, loadFaculty })(
  Archive
);
