import React from "react";
// import "bootstrap/dist/css/bootstrap.css";
import "./styles.css";
import StatusLayout from "./containers/StatusLayout";
import TicketLayout from "./containers/TicketLayout";
import { getTicketNumbers } from "./utils/util";

const tickets = [getTicketNumbers()];

export default function App() {
	return (
		<div className="App">
			<h1>Welcome to Housie</h1>
			<StatusLayout />
			<TicketLayout numbers={tickets} />
		</div>
	);
}
