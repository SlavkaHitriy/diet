import { request } from '~/api/request';

export const generateDiet = async (data: any) => {
    return await request<any>('/chat-gpt/ask-for-diet', 'GET', data);
};
