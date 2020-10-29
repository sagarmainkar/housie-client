import { combineReducers } from "redux";
import sessionReducer from "./session";
import uiReducer from "./ui";

const rootReducer = combineReducers({
  sessionState: sessionReducer,
  UI: uiReducer
});

export default rootReducer;
