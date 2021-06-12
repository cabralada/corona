import { Grid, Typography, Card } from "@material-ui/core";
import { FavoriteRounded } from "@material-ui/icons";
import React from "react"
import { kFormatter } from "../../utility/utility";
import styles from './HightlightCases.module.scss'

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

	const labelText_total = "Total number of";

	return (
		<>
			<Grid item xs={12} sm={4}>
				<Card className={styles.cardCases__cases}>
					<h2 className={styles.cardCases__title}>
						<strong>{kFormatter(cases)}</strong>
					</h2>
					<p className={styles.cardCases__text}>
						{labelText_total} <strong>Cases</strong>
					</p>
				</Card>
			</Grid>
			<Grid item xs={12} sm={4}>
				<Card className={styles.cardCases__death}>
					<h2 className={styles.cardCases__title}>
						<strong>{kFormatter(deaths)}</strong>
					</h2>
					<p className={styles.cardCases__text}>
						{labelText_total} <strong>Deaths</strong>
					</p>
				</Card>
			</Grid>
			<Grid item xs={12} sm={4}>
				<Card className={styles.cardCases__recovered}>
					<h2 className={styles.cardCases__title}>
						<strong>{kFormatter(recovered)}</strong>
					</h2>
					<p className={styles.cardCases__text}>
						{labelText_total} <strong>Recovered</strong>
					</p>
				</Card>
			</Grid>
		</>
	)
}

export default HiglightCases;