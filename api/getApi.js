import axios from "./axios";

export const getAPI = (url, { page = 1, perPage = 100, ...params }) => {
    return axios.get(url, {
        params: {
            page,
            perPage,
            ...params,
        },
    });
};
