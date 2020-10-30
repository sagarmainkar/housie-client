import React from "react";

import { withFirebase } from "../Firebase";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions/user";
import MyButton from "../MyButton";

import SignOutIcon from "@material-ui/icons/ExitToApp";

const SignOutButton = ({ firebase }) => {
  const dispatch = useDispatch();

  return (
    <MyButton tip="Signout" onClick={(e) => dispatch(logout(firebase))}>
      <SignOutIcon color="primary" />
    </MyButton>
  );
};

export default withFirebase(SignOutButton);
