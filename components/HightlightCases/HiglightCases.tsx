import { Grid, Typography, Card } from "@material-ui/core";
import React from "react"
import { kFormatter } from "../../utility/utility";
import styles from './HightlightCases.module.css'

type HiglightCasesProps = {
	cases: number;
	deaths: number;
	recovered: number;
}

const HiglightCases = ({
	cases,
	deaths,
	recovered
}: HiglightCasesProps) => {
	return (
		<>
			<Grid item xs={12} md={4} style={{ textAlign: 'center' }}>
				<Card className={styles.cardCases__cases}>
					<h2 className={styles.cardCases__title}>
						<strong>{kFormatter(cases)}</strong>
					</h2>
					<Typography variant="body2" color="textSecondary" component="p" className={styles.cardCases__text}>
						Total number of cases
					</Typography>
				</Card>
			</Grid>
			<Grid item xs={12} md={4} style={{ textAlign: 'center' }}>
				<Card className={styles.cardCases__death}>
					<h2 className={styles.cardCases__title}>
						<strong>{kFormatter(deaths)}</strong>
					</h2>
					<Typography variant="body2" color="textSecondary" component="p" className={styles.cardCases__text}>
						total number of deaths
					</Typography>
				</Card>
			</Grid>
			<Grid item xs={12} md={4} style={{ textAlign: 'center' }}>
				<Card className={styles.cardCases__recovered}>
					<h2 className={styles.cardCases__title}>
						<strong>{kFormatter(recovered)}</strong>
					</h2>
					<Typography variant="body2" color="textSecondary" component="p" className={styles.cardCases__text}>
						total number of recovered
					</Typography>
				</Card>
			</Grid>
		</>
	)
}

export default HiglightCases;