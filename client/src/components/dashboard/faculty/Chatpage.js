import React, { useEffect, useState } from "react";
import "./assignment.css";
import Comment from "./Comment";
import Spinner from "../../layout/Spinner";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Sidebar from "./Sidebar";
import { getComments, addComment } from "../../../actions/faculty";
import { loadFaculty } from "../../../actions/auth";

const FacChatPage = ({
  addComment,
  getComments,
  loadFaculty,
  faculty: { comments },
  auth: { user, loading },
  match,
}) => {
  useEffect(() => {
    getComments(match.params.course, match.params.year);
    loadFaculty();
  }, [getComments, match.params.year, match.params.course]);
  const [formData, setFormData] = useState({
    msg: "",
  });

  const { msg } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onCommentSubmit = async (e) => {
    addComment({ msg }, match.params.course, match.params.year);
  };

  return !user && loading ? (
    <Spinner />
  ) : (
    <div className="grid-container">
      <div className="menu-icon">
        <i className="fas fa-bars header__menu"></i>
      </div>

      <header className="header">
        <div className="header__logo">Attendance DashBoard</div>
      </header>

      <Sidebar user={user} />

      <div>
        <div className="row">
          <div className="col-12">
            <div className="comments">
              <div className="comment-box add-comment">
                <span className="commenter-pic"></span>
                <span className="commenter-name">
                  <div>
                    <form onSubmit={(e) => onCommentSubmit(e)}>
                      <input
                        type="text"
                        placeholder="Add a public comment"
                        name="msg"
                        value={msg}
                        autoComplete="off"
                        onChange={(e) => onChange(e)}
                      />
                      <button
                        disabled={msg.length === 0}
                        type="submit"
                        className="btn btn-default col-lg-6"
                      >
                        Comment
                      </button>
                    </form>
                  </div>
                </span>

                <br />
                <br />
              </div>

              {comments.length > 0 ? (
                comments.map((comment) => (
                  <ul>
                    <Comment comment={comment} />
                  </ul>
                ))
              ) : (
                <h2> No comments yet.</h2>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

FacChatPage.propTypes = {
  getComments: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  faculty: PropTypes.object.isRequired,
  loadFaculty: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  student: state.student,
  faculty: state.faculty,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  addComment,
  getComments,
  loadFaculty,
})(FacChatPage);
