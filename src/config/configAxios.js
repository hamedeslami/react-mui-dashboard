import axios from 'axios';
import {toast} from "react-toastify";
import {store} from "../store/store.js";
import {login, logout} from "../store/user/user.reducers";

const axiosInstance = axios.create();
const BASE_API_URL = import.meta.env.VITE_BASE_URL;

const onUnAuthorize = async (error) => {
    const originalRequest = error.config;
    const { user } = store.getState();
    const { refreshToken, token } = user;

    try {
        const refreshData = await axiosInstance.post(
            `${BASE_API_URL}/refresh-token`,
            { refreshToken },
            { headers: { Authorization: token } },
        );

        const newToken = refreshData?.data?.data?.token;
        if (!newToken) throw 'token is invalid';

        store.dispatch(login({ ...user, token: newToken }));
        return axios({
            ...originalRequest,
            headers: { ...originalRequest?.headers, Authorization: newToken },
        });
    } catch (e) {
        store.dispatch(logout());
        return Promise.reject(error || error);
    }
};

const onForbiden = () => {
    store.dispatch(logout());
};

const onRequest = (config) => {
    const newConfig = {...config};
    const {
        user: {token},
    } = store.getState();

    newConfig.baseURL = BASE_API_URL;
    newConfig.headers["Content-Type"] = "application/json";

    if (token) {
        newConfig.headers["Authorization"] = "Bearer " + token;
    }

    return newConfig;
};

const onRequestError = (error) => {
    return Promise.reject(error);
};

const onResponse = (response) => {
    return response.data;
};

const onResponseError = async (error) => {
    const realStatus = error?.response?.status;
    const realError = error.response;

    if (realStatus === 401) {
        return onUnAuthorize(error);
    } else if (+realStatus === 403) {
        onForbiden();
    }

    toast.error(realError.data?.message || error?.message);
    return Promise.reject(realError || error);
};

export const setupInterceptorsTo = (axiosInstance) => {
    axiosInstance.interceptors.request.use(onRequest, onRequestError);
    axiosInstance.interceptors.response.use(onResponse, onResponseError);
    return axiosInstance;
};