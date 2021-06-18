import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { fetcher, URL_HISTORY_DISTRICT } from '../../utility/utility';
import styles from './Region.module.scss';
import useSWR from 'swr';
import LoadingProgress from '../LoadingProgress/LoadingProgress';

type RegionProps = {
	districtName: (name: string, id: string) => void
}

const Region = ({districtName}: RegionProps) => {
	const [districts, setDistricts] = useState([]);
	const [district, setDistrict] = useState({title: '', id: ''});
	const { data, error } = useSWR(URL_HISTORY_DISTRICT, fetcher)

	useEffect(() => {
		let listDistricts: any = [];

		if (typeof data !== 'undefined') {
			listDistricts = Object.entries(data.data).map((item: any, index: number) => {
				return {
					title: item[1].name,
					id: item[1].ags
				}
			})
		}

		setDistricts(listDistricts);
	}, [data])

	const handleSelected = (option: any) => option.title;

	useEffect(() => {
		districtName(district.title, district.id);
	}, [district])

	if (districts.length === 0) return <div className={styles.Region__container}><LoadingProgress /></div>;;

  return (
		<div className={styles.Region__container}>
			<Autocomplete
				id="combo-box-demo"
				options={districts}
				onChange={(event, newValue) => {
					newValue !== null
						? setDistrict(newValue)
						: setDistrict({title: '', id: ''})
        }}
				getOptionLabel={handleSelected}
				style={{ width: '100%' }}
				renderInput={
					(params) =>
						<TextField
							{...params}
							label="Check report by region"
							variant="outlined"
						/>}
			/>
		</div>
  );
}

export default Region;
