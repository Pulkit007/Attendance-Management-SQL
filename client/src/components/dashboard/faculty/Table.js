import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { markAttendance } from "../../../actions/faculty";
import { Link } from "react-router-dom";

const Table = ({
  course,
  date,
  index,
  record: { roll, name, year },
  markAttendance,
}) => {
  console.log(index);
  const [formData, setFormData] = useState({
    status: "",
  });

  const { status } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const Submit = async (e) => {
    console.log("inside submit");
    e.preventDefault();
    console.log(roll, year, course, { date, status });
    markAttendance(year, roll, course, { date, status });
  };

  return (
    <tr>
      <td style={{ fontWeight: "700", fontSize: "36" }}>{index}</td>
      <td style={{ fontWeight: "700", fontSize: "36" }}>
        <Link to={`/faculty/attendance/${course}/${roll}/${year}`}>{roll}</Link>
      </td>
      <td style={{ fontWeight: "700" }}>{name}</td>
      <td style={{ fontWeight: "700", fontSize: "36" }}>{date}</td>
      <td>
        <select name="status" value={status} onChange={(e) => onChange(e)}>
          <option value="Choose">Choose</option>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>
      </td>
      <td>
        <button
          style={{ textAlign: "center" }}
          type="submit"
          onClick={(e) => Submit(e)}
        >
          Mark
        </button>
      </td>
    </tr>
  );
};

Table.propTypes = {
  faculty: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  showActions: PropTypes.bool,
  markAttendance: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  faculty: state.faculty,
});

export default connect(mapStateToProps, { markAttendance })(Table);
