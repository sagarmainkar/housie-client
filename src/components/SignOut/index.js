import React from "react";

import { withFirebase } from "../Firebase";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions/user";

const SignOutButton = ({ firebase }) => {
  const dispatch = useDispatch();

  return (
    <button type="button" onClick={(e) => dispatch(logout(firebase))}>
      Sign Out
    </button>
  );
};

export default withFirebase(SignOutButton);
