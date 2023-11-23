import { request } from '~/api/request';

export const generateDiet = async (data: any, params: { userId: string }) => {
    return await request<any>(
        `/chat-gpt/ask-for-diet?userId=${params.userId}`,
        'GET',
        data,
    );
};
