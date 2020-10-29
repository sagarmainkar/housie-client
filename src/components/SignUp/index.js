import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";

import * as ROUTES from "../../constants/routes";

const SignUpFormBase = (props) => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [passwordOne, setPasswordOne] = useState("");
	const [passwordTwo, setPasswordTwo] = useState("");
	const [error, setError] = useState(null);

	const isInvalid =
		passwordOne !== passwordTwo ||
		passwordOne === "" ||
		email === "" ||
		username === "";
	console.log(typeof ROUTES.HOME);
	const onSubmit = (event) => {
		props.firebase
			.doCreateUserWithEmailAndPassword(email, passwordOne)
			.then((authUser) => {
				setUsername("");
				setEmail("");
				setPasswordOne("");
				setPasswordTwo("");
				console.log(ROUTES.HOME);
				props.history.push(ROUTES.HOME);
			})
			.catch((error) => {
				setError(error);
			});

		event.preventDefault();
	};

	return (
		<form onSubmit={onSubmit}>
			<input
				name="username"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				type="text"
				placeholder="Full Name"
			/>
			<input
				name="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				type="text"
				placeholder="Email Address"
			/>
			<input
				name="passwordOne"
				value={passwordOne}
				onChange={(e) => setPasswordOne(e.target.value)}
				type="password"
				placeholder="Password"
			/>
			<input
				name="passwordTwo"
				value={passwordTwo}
				onChange={(e) => setPasswordTwo(e.target.value)}
				type="password"
				placeholder="Confirm Password"
			/>
			<button type="submit" disabled={isInvalid}>
				Sign Up
			</button>

			{error && <p>{error.message}</p>}
		</form>
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
