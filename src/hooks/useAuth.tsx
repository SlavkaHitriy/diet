import { useNavigate } from '@builder.io/qwik-city';
import { cookies } from '~/helpers/cookies';
import { $ } from '@builder.io/qwik';
import { api } from '~/api';
import { RequestLoginData } from '~/api/dto/auth';

export const useAuth = () => {
    const navigate = useNavigate();

    const authorizeUser = $((token: string) => {
        localStorage.setItem('accessToken', token);
        cookies('accessToken', token);
        navigate('/');
    });

    const loginUser = $(async (credentials: RequestLoginData) => {
        const response = await api.loginUser(credentials);

        if (!response.isError && response.data) {
            localStorage.setItem('userId', response.data.userId);
            authorizeUser(response.data.accessToken);
        }

        return response;
    });

    return { loginUser };
};
