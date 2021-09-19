import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import faculty from "./faculty";
import student from "./student";

export default combineReducers({
  alert,
  auth,
  faculty,
  student,
});
