import React from "react"
import HighlightCard from "./HighlightCard"

type HiglighCasesProps = {
	cases: number;
	deaths: number;
	recovered: number;
}

const HiglighCases = ({
	cases,
	deaths,
	recovered
}: HiglighCasesProps) => {

	return (
		<>
			<HighlightCard value={cases} name="Cases" />
			<HighlightCard value={deaths} name="Deaths" />
			<HighlightCard value={recovered} name="Recovered" />
		</>
	)
}

export default HiglighCases;
