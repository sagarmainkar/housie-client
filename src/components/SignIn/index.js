import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";
import { SignUpLink } from "../SignUp";

import { useSelector, useDispatch } from "react-redux";

import { login } from "../../redux/actions/user";

import Typography from "@material-ui/core/Typography";

const SignInFormBase = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const UI = useSelector((state) => state.UI);
  const error = UI.error;
  const dispatch = useDispatch();

  const isInvalid = password === "" || email === "";
  const onSubmit = (event) => {
    event.preventDefault();
    const userData = { email, password };
    dispatch(login(props.firebase, userData, props.history));
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        placeholder="Email Address"
      />
      <input
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
      />
      <button type="submit" disabled={isInvalid}>
        Sign In
      </button>

      {error && <Typography variant="body2">{error.message}</Typography>}
    </form>
  );
};

const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);
const SignInPage = () => (
  <div>
    <h1>SignIn</h1>
    <SignInForm />
    <SignUpLink />
  </div>
);

export default SignInPage;

export { SignInForm };
