import React, { Fragment } from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";
import Spinner from "../../layout/Spinner";
import { connect } from "react-redux";

const Comment = ({
  faculty: { loading },
  comment: { msg, from, createdAt },
  auth: { user },
}) => {
  return loading && !user ? (
    <Spinner />
  ) : (
    <Fragment>
      <div>
        <div className="comment-box">
          <span className="commenter-name">
            <a href="#">{from}</a>{" "}
            <span className="comment-time">
              <Moment format="DD/MM/YYYY">{createdAt}</Moment>
            </span>
          </span>
          <p className="comment-txt more">{msg}</p>
        </div>
      </div>
    </Fragment>
  );
};

Comment.propTypes = {
  faculty: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  showActions: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  faculty: state.faculty,
});

export default connect(mapStateToProps, null)(Comment);
