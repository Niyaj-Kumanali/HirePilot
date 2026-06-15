import axios, { type InternalAxiosRequestConfig } from 'axios';

const BASE_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const attachToken = (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
};

export const API = axios.create({
    baseURL: BASE_API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

API.interceptors.request.use(attachToken);

export const UPLOAD_API = axios.create({
    baseURL: BASE_API_URL,
    timeout: 120000,
});

UPLOAD_API.interceptors.request.use(attachToken);
