import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../../actions/faculty";
import { useHistory } from "react-router-dom";
import { loadFaculty } from "../../../actions/auth";
import Spinner from "../../layout/Spinner";

const CreateCourse = ({ auth: { user }, addPost, loadFaculty }) => {
  useEffect(() => {
    loadFaculty();
  }, []);

  const [formData, setFormData] = useState({
    course: "",
    year: "",
  });

  const { course, year } = formData;
  const history = useHistory();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    addPost({ course, year });
    history.push("/faculty/courses");
  };

  return !user ? (
    <Spinner />
  ) : (
    <div>
      <div className="modal-dialog"></div>
      <div className="modal-body">
        <form
          className="create-form"
          onSubmit={(e) => {
            onSubmit(e);
          }}
        >
          <label for="assgn-name">
            <h1>Course Name</h1>
          </label>
          <input
            type="text"
            id="assgn-name"
            name="course"
            value={course}
            onChange={(e) => onChange(e)}
          />
          <br /> <br />
          <label for="assgn-text">
            <h1>Batch Year</h1>
          </label>
          <input
            type="text"
            name="year"
            value={year}
            onChange={(e) => onChange(e)}
          />
          <div className="">
            <input
              className="btn btn-info "
              type="submit"
              id="submit"
              name="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

CreateCourse.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  loadFaculty: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addPost, loadFaculty })(CreateCourse);
