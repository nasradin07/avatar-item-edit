import { config } from './config';
import { getToken } from './utils/localStorage-utils';

type RequestOptions = {
    signal?: AbortSignal;
    headers?: HeadersInit;
};

const prepareSlug = (str: string) => (str.startsWith('/') ? str : '/' + str);

export const makeRequest = async <ApiResponse>(
    method: 'GET' | 'POST' | 'PUT' | 'PATCH',
    url: string,
    body: BodyInit | null,
    options?: RequestOptions
): Promise<ApiResponse | 'Error'> => {
    const token = getToken();
    try {
        const res = await fetch(config.apiUrl + prepareSlug(url), {
            method,
            headers: {
                Authorization: `Bearer ${token}`,
                ...options?.headers,
            },
            body,
            signal: options?.signal,
        });
        if (res.status > 299) {
            return 'Error';
        }

        return res.json();
    } catch (e) {
        return 'Error';
    }
};
