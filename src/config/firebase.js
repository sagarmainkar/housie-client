import firebase from "firebase";

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
firebase.initializeApp(config);

let messaging;

// we need to check if messaging is supported by the browser
if (firebase.messaging.isSupported()) {
	messaging = firebase.messaging();
	messaging.usePublicVapidKey(
		// Project Settings => Cloud Messaging => Web Push certificates
		"BLfv_mzQk5Rz4oMgtqY2mRebCDZQMSb14ni_9i1Y8e015MVq6JIUZDz1fotT-Wry0lTsL0oU9xFzUCqEC7snuRQ"
	);
}

export { messaging };
