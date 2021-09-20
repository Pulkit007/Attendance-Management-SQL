import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export const Card = ({ course: { course, faculty } }) => {
  return (
    <div className="overviewcard">
      <div className="inner_card">
        <Link to={`/student/courses/${course}`}>
          <h2 style={{ color: "black", textAlign: "center" }}>{course}</h2>
        </Link>
        <h5 style={{ color: "black", textAlign: "center", marginTop: "10px" }}>
          Faculty - {faculty}
        </h5>
      </div>
    </div>
  );
};

Card.propTypes = {
  student: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  showActions: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  student: state.student,
});

export default connect(mapStateToProps, null)(Card);
