import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";
import * as ROUTES from "../../constants/routes";

//MUI Stuff
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

//Redux
import { signupUser } from "../../redux/actions/user";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  ...theme.global
}));

const SignUpFormBase = (props) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const UI = useSelector((state) => state.UI);
  const loading = UI.loading;
  const error = UI.error;

  const isInvalid =
    password !== confirmPassword || password === "" || email === "";

  const handleSubmit = (event) => {
    const userData = {
      email,
      password
    };

    dispatch(signupUser(props.firebase, userData, props.history));
    event.preventDefault();
  };

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <Typography variant="h2" className={classes.pageTitle}>
          Sign Up
        </Typography>
        <form noValidate onSubmit={(e) => handleSubmit(e)}>
          {error && (
            <Typography variant="body2" className={classes.customError}>
              {error.message}
            </Typography>
          )}
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            className={classes.textField}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            className={classes.textField}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            className={classes.textField}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={isInvalid}
          >
            Sign Up
            {loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
          <br />
          <small>
            Already have an account ? Login{" "}
            <Link to={ROUTES.SIGN_IN}>here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = compose(withRouter, withFirebase)(SignUpFormBase);
const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm />
  </div>
);

export default SignUpPage;

export { SignUpForm, SignUpLink };
