import axios from "axios";

export const URL_BASE = "http://localhost:8080";
export const URL_HISTORY_GENERAL_GERMANY = `${URL_BASE}/germany`;
export const URL_HISTORY_GENERAL_CASES = `${URL_BASE}/germany/history/cases/`;
export const URL_HISTORY_GENERAL_DEATHS = `${URL_BASE}/germany/history/deaths/`;
export const URL_HISTORY_GENERAL_RECOVERED = `${URL_BASE}/germany/history/recovered/`;
export const URL_HISTORY_DISTRICT = `${URL_BASE}/districts/`;

export const fetcher = (url: string) => axios.get(url).then(res => res.data)

export const kFormatter = (num: number) => {
	if (Math.abs(num) > 999999) {
		return Math.sign(num)*((Math.abs(num)/1000000).toFixed(1)) + 'm'
	}
	if (Math.abs(num) > 999 && Math.abs(num) < 999999) {
		return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
	}
	return num;
}

export const dataFormat = (data: string) => new Date(data).toLocaleString();

export const sharedReduceCases = (acc: number, item: any) => acc + item.cases;
export const sharedReduceDeaths = (acc: number, item: any) => acc + item.deaths;
export const sharedReduceRecovered = (acc: number, item: any) => acc + item.recovered;
