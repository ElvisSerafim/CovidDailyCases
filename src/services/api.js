import axios from "axios";

export const api = axios.create({
    baseURL: 'https://server-app-covid-daily.herokuapp.com',
});