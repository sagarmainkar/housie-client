import React from "react";
import Ticket from "../components/Ticket";

const TicketLayout = ({ user, firebase, numbers, gameId }) => (
	<Ticket user={user} firebase={firebase} numbers={numbers} gameId={gameId} />
);

export default TicketLayout;
