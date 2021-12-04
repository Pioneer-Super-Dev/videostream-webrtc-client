import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import broadcast from "./broadcast";

export default combineReducers({
  alert,
  auth,
  broadcast,
});
