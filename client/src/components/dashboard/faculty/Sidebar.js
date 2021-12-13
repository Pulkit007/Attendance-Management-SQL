import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../../actions/auth";

export const Sidebar = ({ auth: { user }, logout }) => {
  return (
    <aside className="sidenav">
      <div className="sidenav__close-icon">
        <i className="fas fa-times sidenav__brand-close"></i>
      </div>
      <ul className="sidenav__list">
        <li className="sidenav__list-item">
          <b style={{ fontWeight: "700px", fontSize: "22px" }}>
            Welcome,
            <br />
            {user.name}!
          </b>
        </li>

        <Link
          style={{ color: "white", fontWeight: "500px" }}
          to="/faculty/courses"
        >
          <li className="sidenav__list-item">
            <b>Dashboard</b>
          </li>
        </Link>

        <Link
          style={{ color: "white", fontWeight: "500px" }}
          to="/faculty/create"
        >
          <li className="sidenav__list-item">
            <b>Create Course</b>
          </li>
        </Link>

        <Link
          style={{ color: "white", fontWeight: "500px" }}
          to="/faculty/chat"
        >
          <li className="sidenav__list-item">
            <b>Chat</b>
          </li>
        </Link>

        <Link
          style={{ color: "white", fontWeight: "500px" }}
          to="/faculty/archives"
        >
          <li className="sidenav__list-item">
            <b>Archived courses</b>{" "}
          </li>
        </Link>

        <Link to="/" style={{ color: "white", fontWeight: "500px" }}>
          <li className="sidenav__list-item" onClick={logout}>
            <b>Logout</b>{" "}
          </li>
        </Link>
      </ul>
    </aside>
  );
};

Sidebar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Sidebar);
