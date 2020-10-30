import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navigation, { AuthRoute } from "../Navigation";
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
import { SET_AUTH_USER, CLEAR_SESSION } from "../../constants/actions";

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
      <div className="container">
        <Switch>
          <Route exact path={ROUTES.HOME} component={withFirebase(HomePage)} />
          <AuthRoute exact path={ROUTES.SIGN_UP} component={SignUpPage} />
          <AuthRoute exact path={ROUTES.SIGN_IN} component={SignInPage} />
          <AuthRoute
            exact
            path={ROUTES.PASSWORD_FORGET}
            component={PasswordForgetPage}
          />

          <AuthRoute exact path={ROUTES.ACCOUNT} component={AccountPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default withFirebase(App);
