import axios from 'axios';
import { loginUser } from '~/api/auth/login';
import { registerUser } from '~/api/auth/register';
import { refreshToken } from '~/api/auth/refresh';
import { addDietData } from '~/api/diet/addDietData';
import { addAdditionalData } from '~/api/diet/addAdditionalData';
import { getDiet } from '~/api/diet/getDiet';
import { generateDiet } from '~/api/diet/generateDiet';
import { generateTraining } from '~/api/diet/generateTraining';
import { getUserDetails } from '~/api/user/getUserDetails';
import { saveDiet } from '~/api/diet/saveDiet';
import { saveTraining } from '~/api/diet/saveTraining';
import { deleteCookie } from '~/helpers/cookies';

const api = {
    loginUser,
    registerUser,
    addDietData,
    addAdditionalData,
    getDiet,
    generateDiet,
    generateTraining,
    refreshToken,
    getUserDetails,
    saveDiet,
    saveTraining,
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

let isRefreshing = false;

instance.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !isRefreshing) {
            try {
                deleteCookie('accessToken');
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('userId');
                localStorage.removeItem('diet');
                localStorage.removeItem('training');
                window.location.href = '/';

                // isRefreshing = true;
                // const response = await api.refreshToken({
                //     userId: localStorage.getItem('userId'),
                //     refreshToken: localStorage.getItem('refreshToken'),
                // });
                //
                // console.log(response);
                // return instance.request(originalRequest);
            } catch {
                deleteCookie('accessToken');
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('userId');
                localStorage.removeItem('diet');
                localStorage.removeItem('training');
                window.location.href = '/';
            }
        }
    },
);

export default instance;
export { api };
