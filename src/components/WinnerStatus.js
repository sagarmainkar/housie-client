import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import MailIcon from "@material-ui/icons/Mail";

import { useDocumentData } from "react-firebase-hooks/firestore";
import "firebase/firestore";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		"& > * + *": {
			marginTop: theme.spacing(2),
		},
	},
	heading: {
		fontSize: theme.typography.pxToRem(14),
		flexBasis: "33.33%",
		flexShrink: 0,
	},
	secondaryHeading: {
		fontSize: theme.typography.pxToRem(15),
		color: theme.palette.text.secondary,
	},
}));

const WinnerStatus = ({ user, firebase, gameId }) => {
	const [game, loading, error] = useDocumentData(
		firebase.firestore().doc(`games/${gameId}`),
		{
			snapshotListenOptions: { includeMetadataChanges: false },
		}
	);

	const firstRowWin = game ? game.firstRow : {};
	const secondRowWin = game ? game.secondRow : {};
	const thirdRowWin = game ? game.thirdRow : {};
	const fullHouseWin = game ? game.fullHouse : {};

	let notificationCount = 0;
	if (firstRowWin) notificationCount++;
	if (secondRowWin) notificationCount++;
	if (thirdRowWin) notificationCount++;
	if (fullHouseWin) notificationCount++;

	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};
	return (
		<Accordion expanded={expanded === "panel"} onChange={handleChange("panel")}>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel-content"
				id="panel-header"
			>
				<Typography className={classes.heading}></Typography>
				<Typography className={classes.heading}>Game Status</Typography>
				{notificationCount > 0 ? (
					<Badge badgeContent={notificationCount} color="primary">
						<MailIcon />
					</Badge>
				) : null}
			</AccordionSummary>
			<AccordionDetails>
				<div className={classes.root}>
					{firstRowWin ? (
						<Alert severity="success">
							First Row won by {firstRowWin.name}
						</Alert>
					) : null}
					{secondRowWin ? (
						<Alert severity="success">
							Second Row won by {secondRowWin.name}
						</Alert>
					) : null}
					{thirdRowWin ? (
						<Alert severity="success">
							Third Row won by {thirdRowWin.name}
						</Alert>
					) : null}
					{fullHouseWin ? (
						<Alert severity="success">
							Third Row won by {fullHouseWin.name}
						</Alert>
					) : null}
				</div>
			</AccordionDetails>
		</Accordion>
	);
};

export default WinnerStatus;
