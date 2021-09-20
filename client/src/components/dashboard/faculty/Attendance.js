import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getStudents } from "../../../actions/faculty";
import { connect } from "react-redux";
import Table from "./Table";
import Sidebar from "./Sidebar";

const FacultyAttendance = ({
  getStudents,
  faculty: { students, courses },
  auth: { user },
  match,
}) => {
  let year;
  courses.map((course) => {
    if (course.course === match.params.course) year = course.year;
  });

  useEffect(
    () => {
      getStudents(year);
    },
    [getStudents],
    year
  );

  const [formData, setFormData] = useState({
    date: "",
  });

  const { date, status } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return students.length > 0 ? (
    <Fragment>
      <div className="grid-container">
        {/* <div className="menu-icon">
          <i className="fas fa-bars header__menu"></i>
        </div> */}

        <header className="header">
          <div className="header__logo">Attendance DashBoard</div>
        </header>
        <Sidebar user={user} />

        <div>
          <h1 style={{ paddingLeft: "15px", paddingTop: "15px" }}>
            {match.params.course}{" "}
          </h1>
          <h5 style={{ paddingLeft: "15px" }}>
            <b>Choose date: </b>
          </h5>
          <input
            type="date"
            name="date"
            value={date}
            onChange={(e) => onChange(e)}
          />

          <table
            id="attendance-table"
            className="table table-bordered table-striped"
          >
            <thead className="thead-dark heading">
              <tr>
                <th className="faculty-table-header">S.No</th>
                <th className="faculty-table-header">Roll</th>
                <th className="faculty-table-header">Name</th>
                <th className="faculty-table-header">Date</th>
                <th className="faculty-table-header">Status</th>
                <th className="faculty-table-header">Submit</th>
              </tr>
            </thead>
            <tbody id="myTable">
              {students.map((record, index) => (
                <Table
                  record={record}
                  index={index + 1}
                  date={date}
                  course={match.params.course}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  ) : (
    <div className="grid-container">
      <Sidebar user={user} />
      <h1>No records created for {match.params.course} yet.</h1>
    </div>
  );
};

FacultyAttendance.propTypes = {
  getStudents: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  faculty: state.faculty,
  auth: state.auth,
});

export default connect(mapStateToProps, { getStudents })(FacultyAttendance);
