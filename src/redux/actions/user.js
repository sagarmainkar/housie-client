import {
  SET_AUTH_USER,
  CLEAR_ERRORS,
  SET_ERRORS
} from "../../constants/actions";
import * as ROUTES from "../../constants/routes";

export const login = (firebase, userData, history) => (dispatch) => {
  firebase
    .doSignInWithEmailAndPassword(userData.email, userData.password)
    .then((data) => {
      history.push(ROUTES.HOME);
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((error) => {
      console.error(error);
      dispatch({
        type: SET_ERRORS,
        payload: error
      });
    });
};

export const logout = (firebase) => (dispatch) => {
  firebase
    .doSignOut()
    .then(() => {
      dispatch({ type: CLEAR_ERRORS });
      dispatch({
        type: SET_AUTH_USER,
        payload: null
      });
    })
    .catch((error) => {
      console.error(error);
      dispatch({
        type: SET_ERRORS,
        payload: error
      });
    });
};
