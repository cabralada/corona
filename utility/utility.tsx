import axios from "axios";

export const fetcher = (url: string) => axios.get(url).then(res => res.data)


export const kFormatter = (num: number) => {
	if (Math.abs(num) > 999999) {
		return Math.sign(num)*((Math.abs(num)/1000000).toFixed(1)) + 'm'
	}
	if (Math.abs(num) > 999 && Math.abs(num) < 999999) {
		return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
	}
}

export const dataFormat = (data: string) => new Date(data).toLocaleString();
