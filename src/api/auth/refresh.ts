import { request } from '~/api/request';

export const refreshToken = async (data: any) => {
    return await request<any>('/auth/refresh-token', 'POST', data);
};
