import axios from "axios";

const URL = `https://api.openweathermap.org/data/2.5/weather`
const API_KEY = `c0841eed1c162516fabb39266d3650cf`

export const fetchWeather = async (query) => {
    const { data } = await axios.get(URL, {
        params: {
            q:query,
            units: 'metric',
            APPID: API_KEY
        }
    })

    return data
}