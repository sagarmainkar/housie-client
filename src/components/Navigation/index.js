import React from "react";
import { Link } from "react-router-dom";
import MyButton from "../MyButton";
import SignOutButton from "../SignOut";
import * as ROUTES from "../../constants/routes";

// MUI Stuff
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

// Icons
import HomeIcon from "@material-ui/icons/Home";
import Notifications from "@material-ui/icons/Notifications";
import AuthRoute from "./AuthRoute";

const NavigationNonAuth = () => (
  <>
    <Button color="inherit" component={Link} to={ROUTES.SIGN_IN}>
      Login
    </Button>
    <Button color="inherit" component={Link} to={ROUTES.SIGN_UP}>
      Signup
    </Button>
  </>
);

const NavigationAuth = () => (
  <>
    <Link to="/">
      <MyButton tip="Home">
        <HomeIcon color="primary" />
      </MyButton>
    </Link>
    <MyButton tip="Notifications">
      <Notifications color="primary" />
    </MyButton>
    <SignOutButton />
  </>
);

const Navigation = ({ authUser }) => {
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar className="nav-container">
          {authUser ? <NavigationAuth /> : <NavigationNonAuth />}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navigation;

export { AuthRoute };
