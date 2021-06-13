﻿import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import styles from './TimeFrame.module.scss';

type TimeFrameProps = {
	getPeriod: (days: number | null) => void
}

type periodObj = {
	all: null;
	"1week": number;
	"2weeks": number;
	"3weeks": number;
	"4weeks": number;
}

const TimeFrame = ({getPeriod}: TimeFrameProps) => {

	const [period, setPeriod] = useState('all');

	const periodObj: periodObj = {
		"all": null,
		"1week": 7,
		"2weeks": 7*2,
		"3weeks": 7*3,
		"4weeks": 7*4,
	}

	const handlePeriod = (event: Event, newPeriod: string) => {
		getPeriod(periodObj[newPeriod])

		if (newPeriod === null || newPeriod === period) {
			setPeriod('all');
			return;
		}
		setPeriod(newPeriod);

	};

	useEffect(() => {
		console.log('matches')
	})

	return (
		<div className={styles.TimeFrame__container}>
			<ToggleButtonGroup
				size={"large"}
				value={period}
				exclusive
				onChange={handlePeriod}
				aria-label="Handle time frame report"
				className={styles.TimeFrame__buttonGroups}
			>
				<ToggleButton className={styles.TimeFrame__button} value="all" aria-label="Total value">
					All
				</ToggleButton>
				<ToggleButton className={styles.TimeFrame__button} value="1week" aria-label="Since 1 week ago">
					1w
				</ToggleButton>
				<ToggleButton className={styles.TimeFrame__button} value="2weeks" aria-label="Since 2 weeks ago">
					2w
				</ToggleButton>
				<ToggleButton className={styles.TimeFrame__button} value="3weeks" aria-label="Since 3 weeks ago">
					3w
				</ToggleButton>
				<ToggleButton className={styles.TimeFrame__button} value="4weeks" aria-label="Since 4 weeks ago">
					4w
				</ToggleButton>
			</ToggleButtonGroup>
		</div>
	);
}

export default TimeFrame;