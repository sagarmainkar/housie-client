import {
  SET_AUTH_USER,
  CLEAR_ERRORS,
  SET_ERRORS
} from "../../constants/actions";
import * as ROUTES from "../../constants/routes";

import { getGames } from "./games";

export const login = (firebase, userData, history) => (dispatch) => {
  firebase
    .doSignInWithEmailAndPassword(userData.email, userData.password)
    .then((data) => {
      history.push(ROUTES.HOME);
      dispatch({ type: CLEAR_ERRORS });

      dispatch(getGames(firebase.firestore));
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

export const signupUser = (firebase, userData, history) => (dispatch) => {
  firebase
    .doCreateUserWithEmailAndPassword(userData.email, userData.password)
    .then(() => {
      dispatch({ type: CLEAR_ERRORS });
      history.push(ROUTES.HOME);
    })
    .catch((error) => {
      console.error(error);
      dispatch({
        type: SET_ERRORS,
        payload: error
      });
    });
};
