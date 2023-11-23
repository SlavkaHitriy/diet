import { request } from '~/api/request';

export const saveDiet = async (data: any) => {
    return await request<any>('/user/add-diet-to-user', 'POST', data);
};
