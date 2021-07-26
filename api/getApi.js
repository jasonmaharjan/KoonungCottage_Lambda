import axios from "./axios";

export const getAPI = (url) => {
    return axios.get(url);
};
