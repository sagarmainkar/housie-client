import React from "react";
import ClaimPrize from "./ClaimPrize";
import Row from "./Row";
import Fab from "@material-ui/core/Fab";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	margin: {
		marginTop: theme.spacing(1),
		marginLeft: "auto",
		marginRight: "auto",

		display: "block",
	},
}));

const Ticket = ({ numbers, ticketId }) => {
	const classes = useStyles();

	const firstRow = numbers.slice(0, 7);
	let secondRow = numbers.slice(7, 12);
	const thirdRow = numbers.slice(12, 19);

	secondRow.unshift(-1);
	secondRow.push(-1);

	return (
		<>
			<div className="ticket">
				<h2>Ticket Number: {ticketId}</h2>
				<Row numbers={firstRow} key="row1" />

				<Row numbers={secondRow} key="row2" />
				<Row numbers={thirdRow} key="row3" />
			</div>

			<Fab
				variant="extended"
				size="small"
				color="primary"
				aria-label="add"
				className={classes.margin}
			>
				Claim Full house
			</Fab>
		</>
	);
};

export default Ticket;
