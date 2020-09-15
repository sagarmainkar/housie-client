import React from "react";
import Ticket from "../components/Ticket";

const TicketLayout = ({ numbers }) => (
	<>
		<Ticket numbers={numbers[0]} />
		{/* <hr />
    <Ticket numbers={numbers[1]} /> */}
	</>
);

export default TicketLayout;
