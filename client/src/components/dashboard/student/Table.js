import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Table = ({ index, record: { date, roll, name, id, status } }) => {
  return (
    <tr>
      <td>{index}</td>
      <td>{roll}</td>
      <td>{name}</td>
      <td>{date}</td>
      <td>{status}</td>
    </tr>
  );
};

Table.propTypes = {
  student: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  showActions: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  student: state.student,
});

export default connect(mapStateToProps, null)(Table);
