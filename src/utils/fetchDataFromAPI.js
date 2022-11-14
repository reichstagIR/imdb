import axios from "axios";

const fetchDataFromAPI = async (endpoint = "/" , params = {}) => {
    const option = {
        url : `https://api.themoviedb.org/3${endpoint}`,
        method : "GET",
        header : {
            "X-RapidAPI-Host": "imdb8.p.rapidapi.com"
        },
        params : {
            "api_key" : process.env.REACT_APP_API_KEY,
            ...params,
        }
    }
    const { data } = await axios.request(option);
    return data;
}

export default fetchDataFromAPI;