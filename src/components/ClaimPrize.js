import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";

const useStyles = makeStyles((theme) => ({
	margin: {
		margin: theme.spacing(1),
	},
	extendedIcon: {
		marginRight: theme.spacing(1),
	},
}));

function ClaimPrize() {
	const classes = useStyles();
	return (
		<div>
			<Fab
				variant="extended"
				size="small"
				color="primary"
				aria-label="add"
				className={classes.margin}
			>
				First Row
			</Fab>
			<Fab
				variant="round"
				size="small"
				color="primary"
				aria-label="add"
				className={classes.margin}
			>
				Second Row
			</Fab>
			<Fab
				variant="extended"
				size="small"
				color="primary"
				aria-label="add"
				className={classes.margin}
			>
				Third Row
			</Fab>
			<Fab
				variant="extended"
				size="small"
				color="primary"
				aria-label="add"
				className={classes.margin}
			>
				Full House
			</Fab>
		</div>
	);
}

export default ClaimPrize;
