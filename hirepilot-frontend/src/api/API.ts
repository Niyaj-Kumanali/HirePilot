import axios from 'axios';

// Pull from .env (Vite uses import.meta.env, CRA uses process.env)
const BASE_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const API = axios.create({
    baseURL: BASE_API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});


