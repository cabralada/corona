import { Grid, CircularProgress } from "@material-ui/core";
import React from "react";

type LoadingProgressProps = {
	minHeight?:string;
}

const LoadingProgress = ({minHeight}: LoadingProgressProps) => {
	return (
		<Grid
			container
			direction="row"
			justify="center"
			alignItems="center"
			spacing={3}
			style={{
				minHeight: minHeight ? `${minHeight}vh` : ''
			}}
		>
			<Grid item>
				<CircularProgress />
			</Grid>
		</Grid>
	)
}

export default LoadingProgress;