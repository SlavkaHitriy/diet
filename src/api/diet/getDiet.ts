import { request } from '~/api/request';

export const getDiet = async (data: any) => {
    return await request<any>('/diet/Get', 'GET', data);
};
