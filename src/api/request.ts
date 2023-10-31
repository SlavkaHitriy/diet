import axios from '~/api';
import { AxiosError } from 'axios';

interface RequestResponse<T> {
    data?: T;
    isError: boolean;
    error?: AxiosError;
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
        const axiosError = error as AxiosError;

        return { error: axiosError, isError: true };
    }
};
