import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";
import { SignUpLink } from "../SignUp";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { login } from "../../redux/actions/user";

//MUI Stuff
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import * as ROUTES from "../../constants/routes";

const useStyles = makeStyles((theme) => ({
  ...theme.global
}));

const SignInFormBase = (props) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const UI = useSelector((state) => state.UI);
  const error = UI.error;
  const loading = UI.loading;
  const dispatch = useDispatch();

  const isInvalid = password === "" || email === "";
  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = { email, password };
    dispatch(login(props.firebase, userData, props.history));
  };

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <Typography variant="h2" className={classes.pageTitle}>
          Login
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
            // helperText={errors.email}
            //   error={errors.email ? true : false}
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
            // helperText={errors.password}
            // error={errors.password ? true : false}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={loading}
          >
            Login
            {loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
          <br />
          <SignUpLink />
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);
const SignInPage = () => (
  <div>
    <SignInForm />
  </div>
);

export default SignInPage;

export { SignInForm };
