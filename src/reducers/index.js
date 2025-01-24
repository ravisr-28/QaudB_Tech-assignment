import { combineReducers } from "redux";
import todoReducer from "./todoReducers";
import userReducer from "./userReducers";

const rootReducer = combineReducers({
  todos: todoReducer,
  user: userReducer,
});

export default rootReducer;
