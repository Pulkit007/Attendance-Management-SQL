import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  updateAttendance,
  getStudentAttendance,
} from "../../../actions/faculty";
import { Link } from "react-router-dom";

const DetailsRow = ({
  getStudentAttendance,
  updateAttendance,
  course,
  year,
  index,
  record: { date, roll, name, id, status },
}) => {
  const [formData, setFormData] = useState({
    update: "",
  });

  const { update } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const Submit = async (e) => {
    status = update;
    e.preventDefault();
    updateAttendance(year, roll, course, date, { status });
    getStudentAttendance(year, roll, course);
  };

  return (
    <tr>
      <td style={{ fontWeight: "700", fontSize: "36" }}>{index}</td>
      <td style={{ fontWeight: "700", fontSize: "36" }}>{roll}</td>
      <td style={{ fontWeight: "700" }}>{name}</td>
      <td style={{ fontWeight: "700", fontSize: "36" }}>{date}</td>
      <td>{status}</td>
      <td>
        <select
          style={{ marginRight: "200px" }}
          name="update"
          value={update}
          onChange={(e) => onChange(e)}
        >
          <option value="Choose">Choose</option>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>
        <button type="submit" onClick={(e) => Submit(e)}>
          Submit
        </button>
      </td>
    </tr>
  );
};

DetailsRow.propTypes = {
  updateAttendance: PropTypes.func.isRequired,
  faculty: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  showActions: PropTypes.bool,
  getStudentAttendance: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  faculty: state.faculty,
});

export default connect(mapStateToProps, {
  updateAttendance,
  getStudentAttendance,
})(DetailsRow);
