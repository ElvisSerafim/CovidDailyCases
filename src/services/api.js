import axios from "axios";

export const api = axios.create({
    baseURL: 'https://covid-daily-cases-seven.vercel.app:3333/',
});