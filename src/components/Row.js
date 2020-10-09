import React, { useState } from "react";
import Square from "./Square";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	margin: {
		margin: theme.spacing(1),
		padding: 0,
		paddingTop: theme.spacing(0.2),
		paddingLeft: theme.spacing(0.5),
	},
}));

const Row = ({ key, numbers, onRowChange }) => {
	const [complete, setComplete] = useState(false);
	const classes = useStyles();

	let squares = [];

	const onChange = (num, marked) => {
		onRowChange(num, marked);
	};

	numbers.forEach((num, index) => {
		squares.push(<Square key={index} value={num} onChange={onChange} />);
	});

	return (
		<div className="board-row" key={key}>
			{squares}
		</div>
	);
};

export default Row;
