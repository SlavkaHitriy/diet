import { request } from '~/api/request';

export const addAdditionalData = async (data: any) => {
    return await request<any>('/user/add-food-details', 'POST', data);
};
