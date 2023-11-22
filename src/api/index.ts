import axios from 'axios';
import { loginUser } from '~/api/auth/login';
import { registerUser } from '~/api/auth/register';
import { addDietData } from '~/api/diet/addDietData';
import { addAdditionalData } from '~/api/diet/addAdditionalData';
import { getDiet } from '~/api/diet/getDiet';
import { generateDiet } from '~/api/diet/generateDiet';

const api = {
    loginUser,
    registerUser,
    addDietData,
    addAdditionalData,
    getDiet,
    generateDiet,
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
