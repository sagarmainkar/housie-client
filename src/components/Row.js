import React, { useState } from "react";
import Square from "./Square";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import { firebase } from "../config/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";

const useStyles = makeStyles((theme) => ({
	margin: {
		margin: theme.spacing(0.5),
		marginTop: 0,
	},
}));

const Row = ({ key, numbers }) => {
	const [complete, setComplete] = useState(false);
	const [markedMap, setMarkedMap] = useState(new Map());
	const classes = useStyles();

	const gameId = "gjGLugGl8ZoQP9EdooNb";
	const [game, loading, error] = useDocumentData(
		firebase.firestore().doc(`games/${gameId}`),
		{
			snapshotListenOptions: { includeMetadataChanges: true },
		}
	);

	const drawnNumbers = game ? game.drawnNumbers : [];

	let squares = [];
	// let markedMap = [];
	const checkAllMarked = () => {
		// console.log(markedMap);
		let allMarked = true;
		markedMap.forEach(function (marked, num) {
			// console.log(`Num: ${num} Marked :${marked}`);
			if (!marked) allMarked = false;
		});

		return allMarked;
	};
	const onChange = (num, marked) => {
		// console.log(`Num:${num} Marked:${marked}`);
		setMarkedMap(markedMap.set(num, marked));
		// console.log(checkAllMarked());
		setComplete(checkAllMarked());
	};

	numbers.forEach((num, index) => {
		squares.push(<Square key={index} value={num} onChange={onChange} />);
		if (markedMap.get(num) === undefined && num > 0) {
			markedMap.set(num, false);
		}
	});

	const claimRow = () => {
		let allIncluded = true;
		console.log(drawnNumbers);
		drawnNumbers.forEach((num) =>
			markedMap.has(num) ? "" : (allIncluded = false)
		);

		if (allIncluded) {
		} else {
			console.log("Not all numbers are drawn yet");
		}
	};

	return (
		<div className="board-row" key={key}>
			{squares}
			<Fab
				variant="extended"
				size="small"
				color="primary"
				aria-label="add"
				className={classes.margin}
				disabled={!complete}
				onClick={(e) => claimRow()}
			>
				Claim
			</Fab>
		</div>
	);
};

export default Row;
