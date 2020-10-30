import { combineReducers } from "redux";
import sessionReducer from "./session";
import uiReducer from "./ui";
import gameReducer from "./games";

const rootReducer = combineReducers({
  sessionState: sessionReducer,
  data: gameReducer,
  UI: uiReducer
});

export default rootReducer;
