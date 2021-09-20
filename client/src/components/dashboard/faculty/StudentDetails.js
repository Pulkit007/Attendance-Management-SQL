import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { getStudentAttendance } from "../../../actions/faculty";
import { connect } from "react-redux";
import DetailsRow from "./DetailsRow";
import Sidebar from "./Sidebar";

const StudentDetails = ({
  getStudentAttendance,
  faculty: { studentRecords, courses },
  auth: { user },
  match,
}) => {
  useEffect(
    () => {
      getStudentAttendance(
        match.params.year,
        match.params.roll,
        match.params.course
      );
    },
    [getStudentAttendance],
    match.params.course,
    match.params.roll,
    match.params.year
  );

  let present = 0;
  let total = 0;
  let last = studentRecords[studentRecords.length - 1];
  console.log(studentRecords);
  if (studentRecords) console.log(typeof last);
  if (studentRecords.length > 0) {
    studentRecords.map((record) => {
      total++;
      if (record.status === "Present") present++;
    });
  }

  let percent = Math.ceil((present * 100) / total);

  return studentRecords.length > 0 ? (
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
          <h1 style={{ paddingLeft: "20px", paddingTop: "15px" }}>
            {match.params.course}{" "}
          </h1>
          <div className="main-cards">
            <div className="card" style={{ color: "#000" }}>
              <h2>Average Attendance Record</h2>

              <div className={`c100 p${percent} big`}>
                <span>{percent}%</span>
                <div className="slice">
                  <div className="bar"></div>
                  <div className="fill"></div>
                </div>
              </div>
            </div>

            {percent >= 75 ? (
              <div
                className="card"
                style={{ backgroundColor: "green", color: "white" }}
              >
                <h4>
                  <u>Eligibility (cut-off 75%):</u>
                </h4>
                <h1> Eligible </h1>
              </div>
            ) : (
              <div
                className="card"
                style={{ backgroundColor: "red", color: "white" }}
              >
                <h4>
                  <u>Eligibility (cut-off 75%)</u>
                </h4>
                <h1> Not Eligible </h1>
              </div>
            )}
          </div>

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
                <th className="faculty-table-header">Edit</th>
              </tr>
            </thead>
            <tbody id="myTable">
              {studentRecords.map((record, index) => (
                <DetailsRow
                  record={record}
                  index={index + 1}
                  course={match.params.course}
                  year={match.params.year}
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
      <h1>No records created for {match.params.roll} yet.</h1>
    </div>
  );
};

StudentDetails.propTypes = {
  getStudentAttendance: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  faculty: state.faculty,
  auth: state.auth,
});

export default connect(mapStateToProps, { getStudentAttendance })(
  StudentDetails
);
