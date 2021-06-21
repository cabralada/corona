import React from "react"
import HighlightCard from "./HighlightCard"

type HiglighCasesProps = {
	cases: number;
	deaths: number;
	recovered: number;
	disabledButton?: boolean;
}

const HiglighCases = ({
	cases,
	deaths,
	recovered,
	disabledButton
}: HiglighCasesProps) => {

	return (
		<>
			<HighlightCard disabledButton={disabledButton} value={cases} name="Cases" />
			<HighlightCard disabledButton={disabledButton} value={deaths} name="Deaths" />
			<HighlightCard disabledButton={disabledButton} value={recovered} name="Recovered" />
		</>
	)
}

export default HiglighCases;
