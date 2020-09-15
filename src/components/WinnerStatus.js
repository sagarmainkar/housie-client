import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";

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

const WinnerStatus = ({ winners }) => {
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
			</AccordionSummary>
			<AccordionDetails>
				<div className={classes.root}>
					{winners.map((winner) => (
						<Alert severity="success">
							{winner.prize} won by {winner.name}
						</Alert>
					))}
				</div>
			</AccordionDetails>
		</Accordion>
	);
};

export default WinnerStatus;
