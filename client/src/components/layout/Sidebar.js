import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../actions/auth";

export const Sidebar = ({ user }) => {
  return (
    <aside className="sidenav">
      <div className="sidenav__close-icon">
        <i className="fas fa-times sidenav__brand-close"></i>
      </div>
      <ul className="sidenav__list">
        <li className="sidenav__list-item-avt" style={{ marginRight: "20px" }}>
          <img
            src="https://visualpharm.com/assets/657/Student%20Male-595b40b85ba036ed117dab91.svg"
            alt="Student Avatar"
          />
        </li>
        <li className="sidenav__list-item">
          <b style={{ fontWeight: "700px", fontSize: "22px" }}>
            Welcome,
            <br />
            {user.name}!
          </b>
        </li>

        <li className="sidenav__list-item">
          <Link
            style={{ color: "white", fontWeight: "500px" }}
            to="/student/courses"
          >
            <b>Dashboard</b>
          </Link>
        </li>
        <li onClick={logout} className="sidenav__list-item">
          <Link to="/login" style={{ color: "white", fontWeight: "500px" }}>
            <b>Logout</b>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
