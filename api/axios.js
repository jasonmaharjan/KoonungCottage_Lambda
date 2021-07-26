import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.BASE_URL,
    headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
    },
});

axiosInstance.interceptors.response.use(
    function (response) {
        return response.data;
    },
    function (error) {
        console.log(error);
        return Promise.reject(error);
    }
);

export default axiosInstance;
