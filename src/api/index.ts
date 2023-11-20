import axios from 'axios';
import { loginUser } from '~/api/auth/login';
import { registerUser } from '~/api/auth/register';
import { addDietData } from '~/api/diet/addDietData';

const api = {
    loginUser,
    registerUser,
    addDietData,
};

const instance = axios.create({
    baseURL: 'http://localhost:5000/api',
    timeout: 1000000,
    withCredentials: true,
});

instance.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        config.headers.Authorization = `Bearer ${localStorage.getItem(
            'accessToken',
        )}`;
    }
    return config;
});

export default instance;
export { api };
