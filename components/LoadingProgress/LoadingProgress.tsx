import { Grid, CircularProgress } from "@material-ui/core";
import React from "react";

const LoadingProgress = () => {
	return (
		<Grid
			container
			direction="row"
			justify="center"
			alignItems="center"
			spacing={3}
			style={{
				height: '80vh'
			}}
		>
			<Grid item>
				<CircularProgress />
			</Grid>
		</Grid>
	)
}

export default LoadingProgress;