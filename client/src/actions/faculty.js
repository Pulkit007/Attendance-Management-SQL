import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_COURSES_STUDENT,
  GET_COURSE,
  POST_ERROR,
  GET_ATTENDANCE,
  GET_COURSES_FACULTY,
  GET_STUDENTS,
  MARK,
  GET_STUDENT_ATTENDANCE,
  UPDATE,
  GET_COMMENTS,
  ADD_COMMENT,
  ADD_POST,
  UNARCHIVE,
  ARCHIVE,
  FACULTY_LOADED,
} from "./types";

const BASE_URL = "http:localhost:5000";

//Get subjects
export const getCourses = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/faculty/courses`);

    dispatch({
      type: GET_COURSES_FACULTY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response, status: err.response },
    });
  }
};

// Get attendance for a course
export const getAttendance = (course) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/faculty/students/${course}`);

    dispatch({
      type: GET_ATTENDANCE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response, status: err.response },
    });
  }
};

// Get attendance for a course
export const getStudents = (year) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/faculty/students/${year}`);

    dispatch({
      type: GET_STUDENTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response, status: err.response },
    });
  }
};

// Get attendance for a course
export const getStudentAttendance =
  (year, roll, course) => async (dispatch) => {
    try {
      const res = await axios.get(
        `/api/faculty/attendance/${year}/${roll}/${course}`
      );

      dispatch({
        type: GET_STUDENT_ATTENDANCE,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response, status: err.response },
      });
    }
  };

// Add post
export const addPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post(`/api/faculty/courses`, formData, config);

    dispatch({
      type: ADD_POST,
      payload: res.data,
    });

    dispatch(setAlert("Course Created", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response, status: err.response.status },
    });
  }
};

// Get attendance for a course
export const markAttendance =
  (year, roll, course, { date, status }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const formData = JSON.stringify({ date, status });

    try {
      const res = await axios.post(
        `/api/faculty/attendance/${year}/${roll}/${course}`,
        formData,
        config
      );
      console.log("FIRING");
      dispatch({
        type: MARK,
        payload: res.data,
      });

      dispatch(setAlert("Attendance marked", "success"));
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response, status: err.response },
      });
    }
  };

// Get attendance for a course
export const updateAttendance =
  (year, roll, course, date, { status }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const formData = JSON.stringify({ status });
    console.log("FIRING");
    try {
      const res = await axios.put(
        `/api/faculty/attendance/${year}/${roll}/${course}/${date}`,
        formData,
        config
      );
      console.log("FIRING");
      dispatch({
        type: UPDATE,
        payload: res.data,
      });

      dispatch(setAlert("Attendance updated", "success"));
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response, status: err.response },
      });
    }
  };

// Get attendance for a course
export const archive = (course, year) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  console.log("FIRING");
  try {
    const res = await axios.put(
      `/api/faculty/archive/${course}/${year}`,
      config
    );
    console.log("FIRING");
    dispatch({
      type: ARCHIVE,
      payload: res.data,
    });

    dispatch(setAlert("Archived", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response, status: err.response },
    });
  }
};

// Get attendance for a course
export const unarchive = (course, year) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  console.log("FIRING");
  try {
    const res = await axios.put(
      `/api/faculty/unarchive/${course}/${year}`,
      config
    );
    console.log("FIRING");
    dispatch({
      type: UNARCHIVE,
      payload: res.data,
    });

    dispatch(setAlert("Unarchived", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response, status: err.response },
    });
  }
};
