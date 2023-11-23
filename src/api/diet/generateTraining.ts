import { request } from '~/api/request';

export const generateTraining = async (
    data: any,
    params: { userId: string },
) => {
    return await request<any>(
        `/chat-gpt/ask-for-training?userId=${params.userId}`,
        'GET',
        data,
    );
};
