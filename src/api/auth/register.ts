import { RequestRegisterData } from '~/api/dto/auth';
import { request } from '~/api/request';

export const registerUser = async (data: RequestRegisterData) => {
    return await request('/user/register', 'POST', data);
};

