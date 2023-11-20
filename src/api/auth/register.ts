import { RequestRegisterData } from '~/api/dto/auth';
import { request } from '~/api/request';
import { server$ } from '@builder.io/qwik-city';

export const registerUser = server$(async (data: RequestRegisterData) => {
    return await request('/user/register', 'POST', data);
});
