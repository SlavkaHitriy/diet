import { request } from '~/api/request';

export const saveTraining = async (data: any) => {
    return await request<any>('/user/add-training-to-user', 'POST', data);
};
