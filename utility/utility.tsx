import axios from "axios";

export const URL_HISTORY_GERAL_CASES = 'https://api.corona-zahlen.org/germany/history/cases/';
export const URL_HISTORY_GERAL_DEATHS = 'https://api.corona-zahlen.org/germany/history/deaths/';
export const URL_HISTORY_GERAL_RECOVERED = 'https://api.corona-zahlen.org/germany/history/recovered/';

export const URL_HISTORY_DISTRICT = 'https://api.corona-zahlen.org/districts/';

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
