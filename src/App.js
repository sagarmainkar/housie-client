import React from "react";
// import "bootstrap/dist/css/bootstrap.css";
import "./styles.css";
import StatusLayout from "./containers/StatusLayout";
import TicketLayout from "./containers/TicketLayout";
import { getTicketNumbers } from "./utils/util";
import { firebase } from "./config/firebase";

import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

import { useAuthState } from "react-firebase-hooks/auth";

const tickets = [getTicketNumbers()];
if ("serviceWorker" in navigator) {
	navigator.serviceWorker
		.register("./firebase-messaging-sw.js")
		.then(function (registration) {
			console.log("Registration successful, scope is:", registration.scope);
		})
		.catch(function (err) {
			console.log("Service worker registration failed, error:", err);
		});
}

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();

export default function App() {
	const [user] = useAuthState(auth);
	console.log(user);
	return (
		<div className="App">
			<h1>Welcome to Housie</h1>
			{user ? (
				<>
					<SignOut />
					<StatusLayout />
					<TicketLayout numbers={tickets} />
				</>
			) : (
				<SignIn />
			)}
		</div>
	);

	function SignIn() {
		const signInWithGoogle = () => {
			const provider = new firebase.auth.GoogleAuthProvider();
			auth.signInWithPopup(provider);
		};

		return (
			<>
				<button className="sign-in" onClick={signInWithGoogle}>
					Sign in with Google
				</button>
				<p>
					Do not violate the community guidelines or you will be banned for
					life!
				</p>
			</>
		);
	}
	function SignOut() {
		return (
			auth.currentUser && (
				<button className="sign-out" onClick={() => auth.signOut()}>
					Sign Out
				</button>
			)
		);
	}
}
