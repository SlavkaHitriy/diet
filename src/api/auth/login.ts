import { RequestLoginData } from '~/api/dto/auth';
import { request } from '~/api/request';
import { ResponseLoginData } from '~/api/dto/auth';

export const loginUser = async (data: RequestLoginData) => {
    return await request<ResponseLoginData>('/auth/login', 'POST', data);
};

