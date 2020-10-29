import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from "../Navigation";
import LandingPage from "../Landing";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import PasswordForgetPage from "../PasswordForget";
import HomePage from "../Home";
import AccountPage from "../Account";
// import AdminPage from "../Admin";
import { withFirebase } from "../Firebase";

import { useSelector, useDispatch } from "react-redux";

import * as ROUTES from "../../constants/routes";
import { SET_AUTH_USER } from "../../constants/actions";

const App = (props) => {
  // const [authUser, setAuthUser] = useState(null);
  const authUser = useSelector((state) => {
    return state.sessionState.authUser;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    props.firebase.auth.onAuthStateChanged((authUser) => {
      dispatch({
        type: SET_AUTH_USER,
        payload: authUser
      });
      //authUser ? setAuthUser(authUser) : setAuthUser(null);
    });
  }, [authUser]);
  return (
    <Router>
      <Navigation authUser={authUser} />
      <hr />

      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
      <Route path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      {/* <Route path={ROUTES.ADMIN} component={AdminPage} /> */}
    </Router>
  );
};

export default withFirebase(App);
