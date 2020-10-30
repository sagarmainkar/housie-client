import { SET_AUTH_USER, CLEAR_SESSION } from "../../constants/actions";

const INITIAL_STATE = {
  authUser: null
};

const applySetAuthUser = (state, action) => ({
  ...state,
  authUser: action.payload
});

function sessionReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_AUTH_USER: {
      return applySetAuthUser(state, action);
    }
    case CLEAR_SESSION: {
      return {
        ...state,
        authUser: null
      };
    }
    default:
      return state;
  }
}

export default sessionReducer;
