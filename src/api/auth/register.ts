import { RequestRegisterData } from '~/api/dto/auth';
import { request } from '~/api/request';

export const registerUser = async (data: RequestRegisterData) => {
    return await request('/auth/register', 'POST', data);
};
