import {
  GET_COURSE,
  GET_COURSES_FACULTY,
  POST_ERROR,
  GET_ATTENDANCE,
  GET_STUDENTS,
  MARK,
  GET_STUDENT_ATTENDANCE,
  GET_COMMENTS,
  ADD_COMMENT,
  UPDATE,
  ARCHIVE,
  UNARCHIVE,
  ADD_POST,
} from "../actions/types";

const initialState = {
  attendance: [],
  studentRecords: [],
  comments: [],
  comment: null,
  courses: [],
  students: [],
  course: null,
  post: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_COURSES_FACULTY:
      return {
        ...state,
        courses: payload,
        loading: false,
      };
    case GET_ATTENDANCE:
      return {
        ...state,
        attendance: payload,
        loading: false,
      };
    case ADD_POST:
      return {
        ...state,
        courses: [payload, ...state.courses],
        loading: false,
      };
    case GET_STUDENT_ATTENDANCE:
      return {
        ...state,
        studentRecords: payload,
        loading: false,
      };

    case GET_STUDENTS:
      return {
        ...state,
        students: payload,
        loading: false,
      };

    case GET_COMMENTS:
      return {
        ...state,
        comments: payload,
        loading: false,
      };
    case GET_COURSE:
      return {
        ...state,
        course: payload,
        loading: false,
      };

    case MARK:
      return {
        ...state,
        attendance: [payload, ...state.attendance],
        loading: false,
      };

    case UPDATE:
      return {
        ...state,
        attendance: state.attendance.map((record) =>
          record.id === payload.id ? payload : record
        ),
        loading: false,
      };

    case ARCHIVE:
      return {
        ...state,
        courses: state.courses.map((record) =>
          record.id === payload.id ? payload : record
        ),
        loading: false,
      };

    case UPDATE:
      return {
        ...state,
        courses: state.courses.map((record) =>
          record.id === payload.id ? payload : record
        ),
        loading: false,
      };

    case ADD_COMMENT:
      return {
        ...state,
        comment: [payload, ...state.comments],
        loading: false,
      };

    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
}
