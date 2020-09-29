import React, { useState, useEffect } from "react";
import { getRandomIntInclusive } from "../utils/util";
import { messaging } from "../config/firebase";

const DrawnNumber = () => {
	// const [drawnNumber, setDrawnNumber] = useState(10);

	// useEffect(() => {
	//   const interval = setInterval(
	//     () => setDrawnNumber(getRandomIntInclusive(1, 99)),
	//     5000
	//   );
	//   return () => clearInterval(interval);
	// }, [drawnNumber]);

	// return <div className="drawnnumber">{drawnNumber}</div>;

	const registerPushListener = (pushNotification) =>
		navigator.serviceWorker.addEventListener("message", ({ data }) =>
			pushNotification(
				data.data
					? data.data.message
					: data["firebase-messaging-msg-data"].data.message
			)
		);

	const [num, setNum] = useState(0);
	const [listening, setListening] = useState(false);
	const gameId = "gjGLugGl8ZoQP9EdooNb";
	messaging.onMessage((payload) => {
		console.log("Message received. ", payload);
	});
	useEffect(() => {
		if (!listening) {
			// Get Instance ID token. Initially this makes a network call, once retrieved
			// subsequent calls to getToken will return from cache.
			messaging
				.getToken()
				.then((currentToken) => {
					if (currentToken) {
						console.log(`Token : ${currentToken}`);
					} else {
						// Show permission request.
						console.log(
							"No Instance ID token available. Request permission to generate one."
						);
					}
				})
				.catch((err) => {
					console.log("An error occurred while retrieving token. ", err);

					// messaging
					// 	.requestPermission()
					// 	.then(async function () {
					// 		const token = await messaging.getToken();
					// 	})
					// 	.catch(function (err) {
					// 		console.log("Unable to get permission to notify.", err);
				});
			console.log("Before OnMessage registration");

			// navigator.serviceWorker.addEventListener("message", (message) =>
			// 	console.log(message)
			// );

			// const events = new EventSource(
			// 	`http://localhost:5000/housie-92d5e/us-central1/api/games/${gameId}/enroll`
			// );
			// events.onmessage = (event) => {
			// 	// console.log(event.data);
			// 	const parsedData = JSON.parse(event.data);
			// 	console.log(parsedData.number);
			// 	setNum(parsedData.number);
			// };

			setListening(true);
		}
	}, [listening, num]);

	return <div className="drawnnumber">{num}</div>;
};

export default DrawnNumber;
