import { Grid, Card } from '@material-ui/core';
import React from 'react';
import { kFormatter } from '../../utility/utility';
import styles from './HightlighCases.module.scss'

type HighlightCardProps = {
	value: number;
	name: string;
	disabledButton?: boolean;
}

const HighlightCard = ({value, name, disabledButton}:HighlightCardProps) => {
	const labelText_total = "Number of";

	return (
		<Grid item xs={12} sm={4}>
			<Card
				className={styles[`cardCases__${name.toLowerCase()}`]}
				style={{
					opacity: disabledButton ? 0 : 1,
					transition: 'all 100ms ease-in-out',
				}}
			>
				<h2 className={styles.cardCases__title}>
					<strong data-jest="mockNumberFormat">{kFormatter(value)}</strong>
				</h2>
				<p className={styles.cardCases__text}>
					{labelText_total} <strong>{name}</strong>
				</p>
			</Card>
		</Grid>
	)
}

export default HighlightCard;