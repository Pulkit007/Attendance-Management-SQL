import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { archive, unarchive } from "../../../actions/faculty";
import { useHistory } from "react-router-dom";

export const Card = ({
  archive,
  unarchive,
  course: { course, archived, year, dept },
}) => {
  const Archive = async (e) => {
    e.preventDefault();
    archive(course, year);
  };

  const Unarchive = async (e) => {
    e.preventDefault();
    unarchive(course, year);
  };

  const history = useHistory();

  return (
    <div className="overviewcard">
      <div className="inner_card">
        {archived == 1 ? (
          <div>
            <h2 style={{ color: "black", textAlign: "center" }}>{course}</h2>
            <div className="overviewcard__icon">
              <h4 style={{ color: "black" }}>
                Batch: {dept} - {year}
              </h4>
            </div>
            <button
              type="submit"
              style={{ alignContent: "right" }}
              onClick={(e) => {
                Unarchive(e);
                history.push("/faculty/courses");
              }}
            >
              {" "}
              Unarchive
            </button>
          </div>
        ) : (
          <div>
            <Link to={`/faculty/courses/${course}`}>
              <h2 style={{ color: "black", textAlign: "center" }}>{course}</h2>
            </Link>
            <div className="overviewcard__icon">
              <h4 style={{ color: "black" }}>
                Batch: {dept} - {year}
              </h4>
            </div>
            <button
              type="submit"
              style={{ alignContent: "right" }}
              onClick={(e) => {
                Archive(e);
                history.push("/faculty/archives");
              }}
            >
              {" "}
              Archive
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

Card.propTypes = {
  auth: PropTypes.object.isRequired,
  showActions: PropTypes.bool,
  archive: PropTypes.func.isRequired,
  unarchive: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  student: state.student,
});

export default connect(mapStateToProps, { archive, unarchive })(Card);
