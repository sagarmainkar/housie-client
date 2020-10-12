import React, { useState, useEffect } from "react";
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

// const tickets = [getTicketNumbers()];
// console.log(`Ticket Numbers: ${tickets}`);
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
	const [gameId, setGameId] = useState("");
	const [ticket, setTicket] = useState(null);

	useEffect(() => {
		if (user) {
			console.log("Use Effect ***************");
			firestore
				.collection("games")
				.where("status", "==", "ACTIVE")
				.get()
				.then((querySnapShot) => {
					if (querySnapShot.size < 1) {
						console.log("No Active games");
						return;
					}
					const gameData = [];
					querySnapShot.docs.forEach((doc) => {
						gameData.push(doc.ref.id);
					});
					setGameId(gameData[0]);
					//console.log(gameData[0]);

					firestore
						.collection("tickets")
						.where(firebase.firestore.FieldPath.documentId(), "==", gameData[0])
						.where("userId", "==", user.uid)
						.where("status", "==", "APPROVED")
						.get()
						.then((ticketsSnapshot) => {
							if (ticketsSnapshot.size <= 0) {
								console.log("No tickets allocated ");
							}
							const tick = [];
							ticketsSnapshot.forEach((ticket) => {
								tick.push(ticket.data());
							});

							setTicket(tick[0]);

							console.log(tick[0]);
						});
				});
		}
	}, [user]);

	console.log(user);
	return (
		<div className="App">
			<h1>Welcome to Housie</h1>
			{user && ticket && gameId !== "" ? (
				<>
					<SignOut />
					<StatusLayout />
					<TicketLayout numbers={ticket.numbers} gameId={gameId} />
				</>
			) : (
				<SignIn />
			)}
		</div>
	);

	function SignIn() {
		const signInWithGoogle = () => {
			const provider = new firebase.auth.GoogleAuthProvider();
			auth.signInWithRedirect(provider);
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
