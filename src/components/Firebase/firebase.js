import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";

const config = {
	apiKey: "AIzaSyD-9UX_eih6WFmQCQ0KpfOmzvTabRlndJk",
	authDomain: "housie-92d5e.firebaseapp.com",
	databaseURL: "https://housie-92d5e.firebaseio.com",
	projectId: "housie-92d5e",
	storageBucket: "housie-92d5e.appspot.com",
	messagingSenderId: "101256160192",
	appId: "1:101256160192:web:343691b928388fcbd21e25",
	measurementId: "G-81749QDECM",
};

class Firebase {
	constructor() {
		app.initializeApp(config);

		this.auth = app.auth();
		this.firestore = app.firestore();
		this.analytics = app.analytics();
	}

	get auth() {
		return this.auth;
	}

	get firestore() {
		return this.firestore;
	}

	get analytics() {
		return this.analytics;
	}

	signInWithGoogle = () => {
		const provider = this.auth.GoogleAuthProvider();
		this.auth.signInWithPopup(provider);
	};

	signOutFromGoogle = () => {
		this.auth.signOut();
	};
}

export default Firebase;
