import React from "react";
import PropTypes from "prop-types";
import Sidebar from "./Sidebar";
import CreateCourse from "./CreateCourse";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../../actions/auth";

const CreatePage = ({ auth: { user }, logout }) => {
  return (
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
              to="/faculty/chat"
            >
              <span className="">Chat</span>
            </Link>

            <Link
              style={{ color: "white", fontWeight: "500px" }}
              to="/faculty/archives"
            >
              <span>Archived courses</span>
            </Link>

            <Link to="/" style={{ color: "white", fontWeight: "500px" }}>
              <span onClick={logout}>Logout</span>
            </Link>
          </div>
        </div>
      </header>

      <Sidebar user={user} />
      <CreateCourse />
    </div>
  );
};

CreatePage.propTypes = {
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(CreatePage);
