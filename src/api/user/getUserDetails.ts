import { request } from '~/api/request';

export const getUserDetails = async (data: any, params: { userId: string }) => {
    return await request<any>(
        `/user/get-user?userId=${params.userId}`,
        'GET',
        data,
    );
};
