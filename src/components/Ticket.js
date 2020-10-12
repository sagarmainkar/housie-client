import React, { useState } from "react";
import Row from "./Row";
import { makeStyles } from "@material-ui/core/styles";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";

import { firebase } from "../config/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";

const useStyles = makeStyles((theme) => ({
	margin: {
		marginTop: theme.spacing(1),
		marginLeft: "auto",
		marginRight: "auto",

		display: "block",
	},
	root: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		"& > *": {
			margin: theme.spacing(1),
		},
	},
}));

const Ticket = ({ numbers, gameId }) => {
	const [game, loading, error] = useDocumentData(
		firebase.firestore().doc(`games/${gameId}`),
		{
			snapshotListenOptions: { includeMetadataChanges: true },
		}
	);

	const drawnNumbers = game ? game.drawnNumbers : [];
	const [fullHouse, setFullHouse] = useState(false);
	const [FR, setFR] = useState(false);
	const [SR, setSR] = useState(false);
	const [TR, setTR] = useState(false);

	const [markedMap, setMarkedMap] = useState(new Map());
	const [firstRowMap, setFirstRowMap] = useState(new Map());
	const [secondRowMap, setSecondRowMap] = useState(new Map());
	const [thirdRowMap, setThirdRowMap] = useState(new Map());

	const classes = useStyles();

	const firstRow = numbers.slice(0, 7);
	let secondRow = numbers.slice(7, 12);
	const thirdRow = numbers.slice(12, 19);

	secondRow.unshift(-1);
	secondRow.push(-1);

	numbers.forEach((num) => {
		if (markedMap.get(num) === undefined && num > 0) {
			markedMap.set(num, false);
		}
	});

	firstRow.forEach((num) => {
		if (firstRowMap.get(num) === undefined && num > 0) {
			firstRowMap.set(num, false);
		}
	});

	secondRow.forEach((num) => {
		if (secondRowMap.get(num) === undefined && num > 0) {
			secondRowMap.set(num, false);
		}
	});

	thirdRow.forEach((num) => {
		if (thirdRowMap.get(num) === undefined && num > 0) {
			thirdRowMap.set(num, false);
		}
	});

	const onChange = (num, marked) => {
		setMarkedMap(markedMap.set(num, marked));

		if (firstRowMap.has(num)) {
			setFirstRowMap(firstRowMap.set(num, marked));
		}
		if (secondRowMap.has(num)) {
			setSecondRowMap(secondRowMap.set(num, marked));
		}
		if (thirdRowMap.has(num)) {
			setThirdRowMap(thirdRowMap.set(num, marked));
		}
		// console.log(checkAllMarked());
		setFullHouse(isFullHouse());

		let [fr, sr, tr] = isRowComplete();
		// console.log(fr, sr, tr);

		setFR(fr);
		setSR(sr);
		setTR(tr);
	};

	const isFullHouse = () => {
		let fullHouse = true;
		markedMap.forEach(function (marked, num) {
			// if (!marked) console.log(`Num: ${num} Marked :${marked}`);
			if (!marked) fullHouse = false;
		});

		return fullHouse;
	};

	const isRowComplete = () => {
		let frComplete = true;
		let srComplete = true;
		let trComplete = true;

		firstRowMap.forEach(function (marked, num) {
			if (!marked) frComplete = false;
		});

		secondRowMap.forEach(function (marked, num) {
			if (!marked) srComplete = false;
		});

		thirdRowMap.forEach(function (marked, num) {
			if (!marked) trComplete = false;
		});

		return [frComplete, srComplete, trComplete];
	};

	const claimPrize = (type) => {
		let allIncluded = true;

		switch (type) {
			case 1:
				drawnNumbers.forEach((num) =>
					firstRowMap.has(num) ? "" : (allIncluded = false)
				);
				break;
			case 2:
				drawnNumbers.forEach((num) =>
					secondRowMap.has(num) ? "" : (allIncluded = false)
				);
				break;
			case 3:
				drawnNumbers.forEach((num) =>
					thirdRowMap.has(num) ? "" : (allIncluded = false)
				);
				break;
			case 4:
				drawnNumbers.forEach((num) =>
					markedMap.has(num) ? "" : (allIncluded = false)
				);
				break;
			default:
				allIncluded = false;
				break;
		}

		if (allIncluded) {
		} else {
			console.log("Not all numbers are drawn yet");
		}
	};

	return (
		<>
			<div className="ticket">
				<br />
				<Row numbers={firstRow} key="row1" onRowChange={onChange} />

				<Row numbers={secondRow} key="row2" onRowChange={onChange} />
				<Row numbers={thirdRow} key="row3" onRowChange={onChange} />
			</div>
			<div className={classes.root}>
				<ButtonGroup size="small" aria-label="small outlined button group">
					<Button
						variant="contained"
						color="primary"
						disabled={!FR}
						onClick={(e) => claimPrize(1)}
					>
						FR
					</Button>
					<Button
						variant="contained"
						color="primary"
						disabled={!SR}
						onClick={(e) => claimPrize(2)}
					>
						SR
					</Button>
					<Button
						variant="contained"
						color="primary"
						disabled={!TR}
						onClick={(e) => claimPrize(3)}
					>
						TR
					</Button>
					<Button
						variant="contained"
						color="primary"
						disabled={!fullHouse}
						onClick={(e) => claimPrize(4)}
					>
						FH
					</Button>
				</ButtonGroup>
			</div>
		</>
	);
};

export default Ticket;
