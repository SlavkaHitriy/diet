import { request } from '~/api/request';

export const addDietData = async (data: any) => {
    return await request<any>('/user/add-diet-data', 'POST', data);
};
