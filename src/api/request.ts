import axios from '~/api';
import { AxiosError } from 'axios';

interface RequestResponse<T> {
    data?: T;
    isError: boolean;
    error?: string;
}

export const request = async <T, U = {}>(
    url: string,
    method: string,
    data: U,
): Promise<RequestResponse<T>> => {
    try {
        const response = await axios({
            url,
            method,
            data,
        });

        return { data: response.data, isError: false };
    } catch (error) {
        const axiosError = error as AxiosError<{ title: string }>;

        return {
            error: axiosError.response?.data?.title || axiosError.message,
            isError: true,
        };
    }
};
